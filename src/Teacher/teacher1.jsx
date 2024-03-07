import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from '../Header';

export default function Teacher1() {
  return (
    <div>
      <div className='bodyTC'>
        <div className='nnav'>
          <a href="">รายชื่อวิชา</a>
          <a href="">รายชื่อนักเรียน</a>
          <a href="">ตารางเรียน</a>
          <Link to="/complete">กรอกผลการเรียน</Link>
        </div>
        <div className='nnnav'>

        </div>
      </div>
    </div>
  );
}
