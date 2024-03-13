import axios from 'axios'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Addsubject() {
    const [input, setInput] = useState({
        sub_code: "",
        subject: "",
        credit: ""
    })

    const hdlChange = e => {
        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
    }

    const hdlSubmit = async (e) => {
        e.preventDefault();
        console.log(input)
        try {
            const token = localStorage.getItem('token')
            const rs = await axios.post('http://localhost:2000/admin/subject', input, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (rs.status === 200) {
                alert("Create subject success")
            }
            console.log(rs)
        } catch (err) {
            alert(err.massage)
        }
    }
    const hdlReload = () => {
        window.location.reload
    }


    return (
        <div>
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
                <div className="flex flex-col p-[15px] gap-2 min-h-screen w-[10000px]">
                    {/* style={{ backgroundImage: 'url(https://wallpapers.com/images/hd/blue-aesthetic-moon-df8850p673zj275y.jpg)' }} นำเข้ารูปภาพมาใช้เป็น background*/}
                    <label>รหัสวิชา</label>
                    <input className='w-[250px] h-[35px] rounded-xl' type="text" name="sub_code" value={input.sub_code} onChange={hdlChange} />
                    <label>วิชา</label>
                    <input className='w-[250px] h-[35px] rounded-xl' type="text" name="subject" value={input.subject} onChange={hdlChange} />
                    <label>หน่วยกิต</label>
                    <input className='w-[250px] h-[35px] rounded-xl' type="text" name="credit" value={input.credit} onChange={hdlChange} />
                </div>
                <div className='flex gap-7 p-6 bg-indigo-500'>
                    <button className="btn btn-outline btn-info" onClick={hdlSubmit}>ยืนยัน</button>
                    <button className="btn btn-outline btn-info" onClick={hdlReload}>ยกเลิก</button>
                </div>
            </div>
        </div>
    )
}

