import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Teacher1() {

  const [allClass, setAllClass] = useState([]);
  const [allSubject, setAllSubject] = useState([]);
  const [userClass, setUserClass] = useState([]);
  const [input, setInput] = useState({
    datetime: '',
    grade: '',
    subjectSj_id: '',
    userUser_id: ''

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

  const hdlSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token')
      console.log(input);
      const rs = await axios.post('http://localhost:2000/teacher/term', { ...input, userUser_id: findUser.user_id }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (rs.status === 200) {
        alert("เพิ่มเกรดเรียบร้อย")
      }
      console.log(rs)
    } catch (err) {
      alert(err.massage)
    }
  }


  const hdlChangeSubject = (e) => {
    setInput(prv => ({ ...prv, subjectSj_id: e.target.value }))
    console.log(input);
  }

  const findUser = userClass.find(el => el)
  // console.log(findUser.user_id);


  const hdlSearch = async (e) => {
    e.preventDefault()
    if (input.Class === "") {
      alert("กรุณาเลือกชั้นเรียน")
    }
    else {
      let token = localStorage.getItem('token')
      const rs = await axios.get(`http://localhost:2000/teacher/user/${input.Class}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUserClass(rs.data.getUser)
    }
  }

  return (
    <div>
      <div className='flex'>
        <div className='bg bg-slate-600 flex flex-col w-[20%] gap-6'>
          <Link to='/subject'>รายชื่อวิชา</Link>
          <Link to='/user'>รายชื่อนักเรียน</Link>
          <a href="#">ตารางเรียน</a>
          <Link to="/complete">กรอกผลการเรียน</Link>
        </div>
        <div className='w-[80%] bg bg-pink-500 h-screen'>
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
          <form onSubmit={hdlSubmit}>
            {userClass.length !== 0 ? userClass.map((el) => (
              <div className='flex gap-5 my-3' key={el.user_id}>
                <p className='w-40'>{el.user_id} {el.frist_name} {el.last_name}</p>
                <select name="subjectSj_id" onChange={hdlChangeSubject}>
                  <option value="">กรุณาเลือกวิชา</option>
                  {allSubject.map(sub => (
                    <option key={sub.sj_id} value={sub.sj_id}>{sub.subject}</option>
                  ))}
                </select>
                <label>ปีการศึกษา</label>
                <input className='w-[250px] h-[35px] rounded-xl text-center' type="text" name="datetime" value={input.datetime} onChange={hdlChange} />
                <label>เกรด</label>
                <input className='w-[50px] h-[35px] rounded-xl text-center' type="text" name='grade' value={input.grade} onChange={hdlChange} />
              </div>
            )) : ""}
            <div>
              <button type='submit' className='text-black'>save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


// const handleSubjectChange = (e, userId) => {
//   const { value: subID } = e.target;
//   setInput2(prev => ({
//     ...prev,
//     [userId]: {
//       ...prev[userId],
//       subID
//     }
//   }));
// };