import React from 'react'
import { Link } from 'react-router-dom'

export default function admin1() {
  return (
    <div>
      <div className='flex'>
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            <div className="carousel w-full">
              <div id="slide1" className="carousel-item relative w-full">
                <img src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide4" className="btn btn-circle">❮</a>
                  <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
              </div>
              <div id="slide2" className="carousel-item relative w-full">
                <img src="https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide1" className="btn btn-circle">❮</a>
                  <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
              </div>
              <div id="slide3" className="carousel-item relative w-full">
                <img src="https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide2" className="btn btn-circle">❮</a>
                  <a href="#slide4" className="btn btn-circle">❯</a>
                </div>
              </div>
              <div id="slide4" className="carousel-item relative w-full">
                <img src="https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide3" className="btn btn-circle">❮</a>
                  <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
              </div>
            </div>

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
    </div>
  )
}
