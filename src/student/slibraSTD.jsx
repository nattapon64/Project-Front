import React from 'react'
import { Link } from 'react-router-dom'

function slibraSTD() {
  return (
    <div className='bg-slate-600 flex flex-col w-1/5 gap-6 p-4'>
        <Link to='/Student' className="text-white hover:bg-slate-500 p-2 rounded">หน้าหลัก</Link>
        <Link to='/ProfileSTD' className="text-white hover:bg-slate-500 p-2 rounded">โปรไฟล์</Link>
        <Link to='#' className="text-white hover:bg-slate-500 p-2 rounded">รายชื่อวิชา</Link>
        <Link to='#' className="text-white hover:bg-slate-500 p-2 rounded">ตารางเรียน</Link>
        <Link to='#' className="text-white hover:bg-slate-500 p-2 rounded">ผลการเรียน</Link>
    </div>
  )
}

export default slibraSTD