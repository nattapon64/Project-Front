import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from '../Header';

export default function Teacher1() {
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

        </div>
      </div>
    </div>
  );
}
