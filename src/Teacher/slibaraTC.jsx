import React from 'react'
import { Link } from 'react-router-dom'

function slibaraTC() {
    return (
        <div className="bg-slate-600 flex flex-col w-1/5 gap-6 p-4">
            <Link to='/subject' className="text-white hover:bg-slate-500 p-2 rounded">รายชื่อวิชา</Link>
            <Link to='/user' className="text-white hover:bg-slate-500 p-2 rounded">รายชื่อนักเรียน</Link>
            <Link to="/complete" className="text-white hover:bg-slate-500 p-2 rounded">กรอกผลการเรียน</Link>
            <Link to="/searchedit" className="text-white hover:bg-slate-500 p-2 rounded">ค้นหา</Link>
        </div>
    )
}

export default slibaraTC