import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from '../Header';

export default function Teacher1() {
  return (
    <div>
      <div className='flex'>
        <div className="bg-slate-600 flex flex-col w-1/5 gap-6 p-4">
          <Link to='/subject' className="text-white hover:bg-slate-500 p-2 rounded">รายชื่อวิชา</Link>
          <Link to='/user' className="text-white hover:bg-slate-500 p-2 rounded">รายชื่อนักเรียน</Link>
          <a href="#" className="text-white hover:bg-slate-500 p-2 rounded">ตารางเรียน</a>
          <Link to="/complete" className="text-white hover:bg-slate-500 p-2 rounded">กรอกผลการเรียน</Link>
          <Link to="/searchedit" className="text-white hover:bg-slate-500 p-2 rounded">ค้นหา</Link>
        </div>
        <div className='w-[80%] h-screen'>

        </div>
      </div>
    </div>
  );
}
