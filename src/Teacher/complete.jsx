import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import Header from '../Header';

const guestNav = [
  { to: '/', text: 'Login' },
  { to: '/register', text: 'Register' },
];

const userNav = [
  // ถ้ามีการนำไปใช้เมื่อผู้ใช้ล็อกอิน จะเพิ่มเส้นทางที่นี่
];

export default function Teacher1() {

  const [allClass, setAllClass] = useState([]);
  const [allSubject, setAllSubject] = useState([]);
  const [userClass, setUserClass] = useState([]);
  const [input, setInput] = useState({
    Class: " "
  });
  const [input2, setInput2] = useState({
    subID: " ",
    grade: " "
  });

  useEffect(() => {
    document.title = 'complete';
    const getClass = async () => {
      let token = localStorage.getItem('token')
      const rs = await axios.get('http://localhost:2000/teacher/class', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setAllClass(rs.data.getClass)
    }
    getClass();

  }, [])

  useEffect(() => {
    document.title = 'complete';
    const getSubject = async () => {
      let token = localStorage.getItem('token')
      const rs = await axios.get('http://localhost:2000/teacher/subject', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setAllSubject(rs.data.getSubject)
    }
    getSubject();
  }, [])

  const hdlChange = e => {
    setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
  }
  const handleSubjectChange = (e, userId) => {
    const { value: subID } = e.target;
    setInput2(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        subID
      }
    }));
  };
  console.log(input2)
  const hdlSearch = async (e) => {
    e.preventDefault()
    let token = localStorage.getItem('token')
    const rs = await axios.get(`http://localhost:2000/teacher/user/${input.Class}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(rs.data)
    setUserClass(rs.data.getUser)
    setInput2(prevInput2 => ({
      ...prevInput2,
      userId: rs.data.getUser.map(user => user.user_id) // นำ user_id ทั้งหมดมาเก็บไว้ใน input2
    }));
  }
  console.log(userClass)



return (
  <div>
    <div className='bodyTC'>
      <div className='nnav'>
        <a href="#">รายชื่อวิชา</a>
        <a href="#">รายชื่อนักเรียน</a>
        <a href="#">ตารางเรียน</a>
        <Link to="/complete">กรอกผลการเรียน</Link>
      </div>
      <div className='nnnav'>
        <div>
          <form className='flex flex-col text-blue gap-5 w-[30%] h-20 ml-5 mt-5'>
            <select name="Class" value={input.Class} onChange={hdlChange} id="">
              <option value="">กรุณาเลือกชั้นเรียน</option>
              {allClass.map(el => (
                <option key={el.cl_id} value={el.cl_id}>{el.classroom}</option>
              ))}
            </select>
            <div>
              <button className='text-black' onClick={hdlSearch}>ค้นหา</button>
            </div>
          </form>
        </div>
        <form>
          {userClass.length !== 0 ? userClass.map((el) => (
            <div className='bg-black flex gap-5 my-3' key={el.user_id}>
              <p className='w-40'>{el.frist_name}, {el.last_name}, {el.classCl_id}, {el.user_id}</p>
              <select name="" id="" onChange={(e) => handleSubjectChange(e, el.user_id)}>
                <option value="">กรุณาเลือกวิชา</option>
                {allSubject.map(sub => (
                  <option key={sub.sj_id} value={sub.sj_id}>{sub.subject}</option>
                ))}
              </select>
              <input type="text" />
              <button>บันทึก</button>
            </div>
          )) : ""}
        </form>
        <div className='text-2xl mt-2 flex justify-end gap-5 mr-5 mb-5'>
          <button className="btn btn-outline btn-info"><Link to="/teacher2">ยืนยัน</Link></button>
          <button className="btn btn-outline btn-info"><Link>แก้ไข</Link></button>
        </div>
      </div>
    </div>
  </div>
);
}
