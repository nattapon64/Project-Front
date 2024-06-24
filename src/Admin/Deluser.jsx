import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import Slibaradmin from './slibaradmin'
import { toast } from 'react-toastify'


function Deluser() {
    const [data, setData] = useState([])

    useEffect(() => {
        let token = localStorage.getItem("token");

        axios.get(`http://localhost:2000/admin/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => setData(res.data.user))
            .catch(err => console.log(err))
    }, [])

    const hdlDelete = async (e, user_id) => {
        try {
            e.preventDefault()
            const token = localStorage.getItem('token')
            const rs = await axios.delete(`http://localhost:2000/admin/user/${user_id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (rs.status === 200) {
                toast.success("ลบข้อมูลสำเร็จ", {
                  onClose: () => location.reload(),
                  autoClose: 2000,
                })
              }
            // setTrigger(prv => !prv)
        } catch (err) {
            toast.error("ไม่สามารถลบข้อมูลได้")
            console.log(err)
        }
    }

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
    const modalId = `my_modal_${user.user_id}`
    // console.log(modalId)
    const [editData, setEditData] = useState({
        username: user.username,
        frist_name: user.frist_name,
        last_name: user.last_name,
        email: user.eamil
    });

    const [isEditing, setEditing] = useState(false);

    const handleEditCilck = () => {
        setEditData({ ...user });
        setEditing(true);
    }

    const handleSaveClick = async (e) => {
        setEditData(false);
        try {
            e.preventDefault()
            const user_id = user.user_id;
            const apiUrl = `http://localhost:2000/admin/update/${user_id}`
            const rs = await axios.patch(apiUrl, editData);


            console.log(rs)

            if (rs.status === 200) {
                toast.success("แก้ไขข้อมูลสำเร็จ", {
                  onClose: () => location.reload(),
                  autoClose: 2000,
                })
                setEditing(false);
                document.getElementById(modalId).close();
              }
        } catch (err) {
            // console.log(err)
            console.log("เกิดข้อผิดพลาดในการแก้ไข", err);
        }
    };

    const handleChange = (e) => {
        setEditData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const hdlBack = (id) => {
        if (isEditing) {
            setEditing(!isEditing)
        }
        document.getElementById(id).close()
    }

    return (
        <dialog id={modalId} className='modal'>
            {/* {console.log(modalId)} */}
            <div className='modal-box'>
                <h3 className='font-bold text-lg mb-5'>
                    แก้ไขผู้ใช้งาน
                </h3>
                <h3 className='text-lg mb-5'>
                    username :
                    {isEditing ?
                        <input className='px-2 py-1 rounded-md w-4/5' type='text' name='username' value={editData.username} onChange={handleChange} />
                        : user.username
                    }
                </h3>
                <h3 className='text-lg mb-5'>
                    frist_name :
                    {isEditing ?
                        <input className='px-2 py-1 rounded-md w-4/5' type='text' name='frist_name' value={editData.frist_name} onChange={handleChange} />
                        : user.frist_name
                    }
                </h3>
                <h3 className='text-lg mb-5'>
                    last_name :
                    {isEditing ?
                        <input className='px-2 py-1 rounded-md w-4/5' type='text' name='last_name' value={editData.last_name} onChange={handleChange} />
                        : user.last_name
                    }
                </h3>
                <h3 className='text-lg mb-5'>
                    email :
                    {isEditing ?
                        <input className='px-2 py-1 rounded-md w-4/5' type='text' name='email' value={editData.email} onChange={handleChange} />
                        : user.email
                    }
                </h3>
                <div className='flex justify-end gap-2'>
                    <button type="button" className='btn btn-outline btn-error' onClick={() => hdlBack(modalId)}>ย้อนกลับ</button>
                    {isEditing ? (
                        <button className="btn btn-outline btn-info" onClick={handleSaveClick}>บันทึก</button>
                    ) : (
                        <button className="btn btn-outline btn-info" onClick={handleEditCilck}>แก้ไข</button>
                    )}
                </div>
            </div>
        </dialog>
    )
}
export default Deluser