import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


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
            alert('Delete Successful')
            location.reload();
            setTrigger(prv => !prv)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <div className='flex'>
                <div className='flex'>
                    <div className="drawer lg:drawer-open">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content flex flex-col items-center justify-center">
                            {/* Page content here */}
                            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu gap-5 p-4 w-80 min-h-full bg-emerald-500 text-base-content text-black">
                                {/* Sidebar content here */}
                                <Link to='/News'><li>ข่าวสาร</li></Link>
                                <Link to='/add'><li>สมัคร</li></Link>
                                <Link to='/Addsub'><li>เพิ่มรายวิชา</li></Link>
                                <Link to='/Deluser'><li>แก้ไขผู้ใช้งาน</li></Link>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='mt-3 w-screen'>
                    <h3 className='flex justify-center'>รายชื่อ</h3>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>username</th>
                                <th>Frist_name</th>
                                <th>Last_name</th>
                                <th>Email</th>
                                <th>IMG</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((user, index) => (
                                <tr key={index + 1}>
                                    <td>{user.username}</td>
                                    <td>{user.frist_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td><img className='max-h-[100px]' src={user.IMG} alt="picture" /></td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button className="btn" onClick={() => document.getElementById(`my_modal_${user.user_id}`).showModal()}>แก้ไข</button>
                                        <dialog id="my_modal_4" className="modal">
                                            <div className="modal-box w-11/12 max-w-5xl">
                                                <h3 className="font-bold text-lg">Hello!</h3>
                                                <p className="py-4"></p>
                                                <div className="modal-action">
                                                    <form method="dialog">
                                                        <button className="btn">Close</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </dialog></td>
                                    <td><button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={(e) => hdlDelete(e, user.user_id)}>ลบ</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {data.map((user, index) => (
                    <Modal key={index} user={user}/>
                ))}
            </div>
        </div>
    )
}

const Modal = ({ user }) => {
    const modalId = `my_modal_${user.user_id}`
    // console.log(modalId)
    const [ editData, setEditData ] = useState({
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
            await axios.patch(apiUrl, editData);

            location.reload();
            setEditing(false);
            document.getElementById(modalId).closest();
        } catch (err) {
            console.log("เกิดข้อผิดพลาดในการแก้ไข", err);
        }
    };

    const handleChange = (e) => {
        setEditData( (prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const hdlBack = (id) => {
        if (isEditing){
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
                <h3 className='text-lg mb-5'>username : {isEditing ? <input className='px-2 py-1 rounded-md w-4/5' type='text' name='username' value={editData.username}  onChange={handleChange} /> : user.username}</h3>
                <h3 className='text-lg mb-5'>frist_name : {isEditing ? <input className='px-2 py-1 rounded-md w-4/5' type='text' name='frist_name' value={editData.frist_name}  onChange={handleChange} /> : user.frist_name}</h3>
                <h3 className='text-lg mb-5'>last_name : {isEditing ? <input className='px-2 py-1 rounded-md w-4/5' type='text' name='last_name' value={editData.last_name}  onChange={handleChange} /> : user.last_name}</h3>
                <h3 className='text-lg mb-5'>email : {isEditing ? <input className='px-2 py-1 rounded-md w-4/5' type='text' name='email' value={editData.email}  onChange={handleChange} /> : user.email}</h3>
                <div className='flex justify-end gap-2'>
                    <button type="button" className='btn btn-outline btn-error' onClick={ () => hdlBack(modalId)}>ย้อนกลับ</button>
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