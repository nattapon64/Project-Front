import React from 'react'
import { Link } from 'react-router-dom'

function slibaradmin() {
    return (
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu gap-5 p-4 w-80 min-h-full bg-cyan-300 text-base-content text-black">
                <li><Link to='/News'>ข่าวสาร</Link></li>
                <li><Link to='/add'>สมัคร</Link></li>
                <li><Link to='/Addsub'>เพิ่มรายวิชา</Link></li>
                <li><Link to='/Deluser'>แก้ไขผู้ใช้งาน</Link></li>
            </ul>
        </div>
    )
}

export default slibaradmin