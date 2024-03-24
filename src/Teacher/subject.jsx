import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function subject() {
    const [data, setData] = useState([])

    useEffect(() => {
        let token = localStorage.getItem("token");

        axios.get(`http://localhost:2000/teacher/subject`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => setData(res.data.getSubject))
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
                                    <th>รหัสวิชา</th>
                                    <th>วิชา</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((subject, index) => (
                                    <tr key={index + 1}>
                                        <td>{subject.sub_code}</td>
                                        <td>{subject.subject}</td>
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

export default subject