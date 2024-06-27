import React from 'react';
import { Link } from 'react-router-dom';

function SidebarAdmin() {
    return (
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu flex flex-col gap-4 p-4 w-80 min-h-full bg-blue-500 text-white">
                <li>
                    <Link to='/add' className="hover:underline">สมัคร</Link>
                </li>
                <li>
                    <Link to='/Addsub' className="hover:underline">เพิ่มรายวิชา</Link>
                </li>
                <li>
                    <Link to='/Deluser' className="hover:underline">แก้ไขผู้ใช้งาน</Link>
                </li>
            </ul>
        </div>
    );
}

export default SidebarAdmin;
