import React from 'react'
import { Link } from 'react-router-dom'

export default function admin1() {
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
            <ul className="menu p-4 w-80 min-h-full bg-emerald-500 text-base-content text-black">
              {/* Sidebar content here */}
              <Link to='/add'><li><a>สมัคร</a></li></Link>
              <Link to='/Addsub'><li><a>เพิ่มรายวิชา</a></li></Link>
              <Link to='/Deluser'><li><a>แก้ไขผู้ใช้งาน</a></li></Link>
            </ul>
          </div>
        </div>
        <div className="hero min-h-screen w-[10000px]" style={{ backgroundImage: 'url(https://wallpapers.com/images/hd/blue-aesthetic-moon-df8850p673zj275y.jpg)' }}>
          Hello
        </div>
      </div>
    </div>
  )
}
