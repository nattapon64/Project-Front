import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function user() {
    const [data, setData] = useState([])

    useEffect(() => {
        let token = localStorage.getItem("token");

        axios.get(`http://localhost:2000/teacher/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => setData(res.data.getUser))
            .catch(err => console.log(err))
    }, [])
    console.log(data)

    return (
        <div>
            <div className='flex'>
                <div className='bg bg-slate-600 flex flex-col w-[20%] gap-6'>
                    <Link to='/subject'>รายชื่อวิชา</Link>
                    <Link to='/user'>รายชื่อนักเรียน</Link>
                    <a href="">ตารางเรียน</a>
                    <Link to="/complete">กรอกผลการเรียน</Link>
                </div>
                <div className='w-[80%] bg bg-pink-500 h-screen'>
                    <div className='mt-3 w-[100%]'>
                        <h3 className='flex justify-center'>รายชื่อ</h3>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Frist_name</th>
                                    <th>Last_name</th>
                                    <th>Class</th>
                                    <th>IMG</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.filter(teacher => teacher.role === "STUDENT").map((user, index) => (
                                    <tr key={index + 1}>
                                        <td>{user.frist_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.class.classroom}</td>
                                        <td><img className='max-h-[100px]' src={user.IMG} alt="picture" /></td>
                                        <td>{user.role}</td>
                                        <td>
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
