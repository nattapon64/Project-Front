import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


function Deluser() {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:2000/admin/user')
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }, [])
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
                            <ul className="menu p-4 w-80 min-h-full bg-emerald-500 text-black text-base-content">
                                {/* Sidebar content here */}
                                <Link to='/add'><li><a>สมัคร</a></li></Link>
                                <Link to='/Addsub'><li><a>เพิ่มรายวิชา</a></li></Link>
                                <Link to='/Deluser'><li><a>แก้ไขผู้ใช้งาน</a></li></Link>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='mt-3 w-screen'>
                    <h3 className='flex justify-center'>รายชื่อ</h3>
                    <table className='table'>
                        <tr>
                            <th>Frist_name</th>
                            <th>Last_name</th>
                            <th>Email</th>
                            <th>IMG</th>
                            <th>Status</th>
                        </tr>
                    </table>
                    <tbody>
                        {
                            data.map((user, index) => {
                                <tr key={index}>
                                    <td>{user.frist_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.gmail}</td>
                                    <td>{user.IMG}</td>
                                    <td>{user.role}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </div>
            </div>
        </div>
    )
}

export default Deluser