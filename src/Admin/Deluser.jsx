import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slibaradmin from './slibaradmin';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';



function Deluser() {
    const [data, setData] = useState([]);

    useEffect(() => {
        let token = localStorage.getItem("token");

        if (!token) {
            toast.error("การเชื่อมต่อหมดอายุ กรุณาเข้าสู่ระบบใหม่");
            return;
        }

        axios.get(`http://localhost:2000/admin/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => setData(res.data.user))
            .catch(err => console.log(err));
    }, []);

    const hdlDelete = async (e, user_id) => {
        e.preventDefault();
        Swal.fire({
            title: 'คุณแน่ใจหรือไม่?',
            text: "คุณจะไม่สามารถกู้คืนข้อมูลนี้ได้!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่, ลบเลย!',
            cancelButtonText: 'ยกเลิก'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        toast.error("การเชื่อมต่อหมดอายุ กรุณาเข้าสู่ระบบใหม่");
                        return;
                    }
                    const rs = await axios.delete(`http://localhost:2000/admin/user/${user_id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (rs.status === 200) {
                        // toast.success("ลบข้อมูลสำเร็จ", {
                        //     autoClose: 2000,
                        // });
                        // อัพเดทข้อมูลหลังจากลบ
                        setData(prevData => prevData.filter(user => user.user_id !== user_id));
                        Swal.fire(
                            'ลบแล้ว!',
                            'ข้อมูลของคุณถูกลบเรียบร้อยแล้ว.',
                            'success'
                        );
                    }
                } catch (err) {
                    toast.error("ไม่สามารถลบข้อมูลได้");
                    console.log(err);
                }
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden m-4">Open drawer</label>
                    <div className="overflow-x-auto p-6">
                        <h3 className="text-2xl font-bold mb-4 text-center">รายชื่อ</h3>
                        <table className="table-auto w-full bg-white shadow-md rounded-lg">
                            <thead>
                                <tr className="bg-gray-200 text-left">
                                    <th className="p-4">Username</th>
                                    <th className="p-4">First Name</th>
                                    <th className="p-4">Last Name</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Image</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((user, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="p-4">{user.username}</td>
                                        <td className="p-4">{user.frist_name}</td>
                                        <td className="p-4">{user.last_name}</td>
                                        <td className="p-4">{user.email}</td>
                                        <td className="p-4"><img className="max-h-24" src={user.IMG} alt="User" /></td>
                                        <td className="p-4">{user.role}</td>
                                        <td className="p-4 flex gap-2">
                                            <button className="btn btn-primary" onClick={() => document.getElementById(`my_modal_${user.user_id}`).showModal()}>แก้ไข</button>
                                            <button className="btn btn-danger" onClick={(e) => hdlDelete(e, user.user_id)}>ลบ</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Slibaradmin />
            </div>
            {data.map((user, index) => (
                <Modal key={index} user={user} />
            ))}
        </div>
    );
}

const Modal = ({ user }) => {
    const modalId = `my_modal_${user.user_id}`;
    const [editData, setEditData] = useState({
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
    });

    const [isEditing, setEditing] = useState(false);

    const handleEditClick = () => {
        setEditData({ ...user });
        setEditing(true);
    };

    const handleSaveClick = async (e) => {
        try {
            e.preventDefault();
            const user_id = user.user_id;
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error("การเชื่อมต่อหมดอายุ กรุณาเข้าสู่ระบบใหม่");
                return;
            }
            const apiUrl = `http://localhost:2000/admin/update/${user_id}`;
            const rs = await axios.patch(apiUrl, editData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (rs.status === 200) {
                toast.success("แก้ไขข้อมูลสำเร็จ", {
                    onClose: () => window.location.reload(),
                    autoClose: 2000,
                });
                setEditing(false);
                document.getElementById(modalId).close();
            }
        } catch (err) {
            toast.error("เกิดข้อผิดพลาดในการแก้ไข");
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setEditData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    const handleBack = () => {
        setEditing(false);
        document.getElementById(modalId).close();
    };

    return (
        <dialog id={modalId} className='modal'>
            <div className='modal-box'>
                <h3 className='font-bold text-lg mb-5'>
                    แก้ไขผู้ใช้งาน
                </h3>
                <h3 className='text-lg mb-5'>
                    Username:
                    {isEditing ?
                        <input className='px-2 py-1 rounded-md w-4/5' type='text' name='username' value={editData.username} onChange={handleChange} />
                        : user.username
                    }
                </h3>
                <h3 className='text-lg mb-5'>
                    First Name:
                    {isEditing ?
                        <input className='px-2 py-1 rounded-md w-4/5' type='text' name='first_name' value={editData.first_name} onChange={handleChange} />
                        : user.first_name
                    }
                </h3>
                <h3 className='text-lg mb-5'>
                    Last Name:
                    {isEditing ?
                        <input className='px-2 py-1 rounded-md w-4/5' type='text' name='last_name' value={editData.last_name} onChange={handleChange} />
                        : user.last_name
                    }
                </h3>
                <h3 className='text-lg mb-5'>
                    Email:
                    {isEditing ?
                        <input className='px-2 py-1 rounded-md w-4/5' type='text' name='email' value={editData.email} onChange={handleChange} />
                        : user.email
                    }
                </h3>
                <div className='flex justify-end gap-2'>
                    <button type="button" className='btn btn-outline btn-error' onClick={handleBack}>ย้อนกลับ</button>
                    {isEditing ? (
                        <button className="btn btn-outline btn-info" onClick={handleSaveClick}>บันทึก</button>
                    ) : (
                        <button className="btn btn-outline btn-info" onClick={handleEditClick}>แก้ไข</button>
                    )}
                </div>
            </div>
        </dialog>
    );
};

export default Deluser;
