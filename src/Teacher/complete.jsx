import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SlibaraTC from './slibaraTC';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Teacher1() {
  const [allClass, setAllClass] = useState([]);
  const [allSubject, setAllSubject] = useState([]);
  const [userClass, setUserClass] = useState([]);
  const [Year, setYear] = useState("");
  const [input, setInput] = useState({
    grade: '',
    subjectSj_id: '',
    userUser_id: '',
    Class: '',
    datetime: ''
  });
  const [modalData, setModalData] = useState({ isVisible: false, userId: null });
  const [userByID, setUserByID] = useState({});

  useEffect(() => {
    document.title = 'Complete';
    const getClass = async () => {
      let token = localStorage.getItem('token');
      try {
        const rs = await axios.get('http://localhost:2000/teacher/class', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAllClass(rs.data.getClass);
      } catch (error) {
        toast.error("เกิดข้อผิดพลาดในการโหลดข้อมูลชั้นเรียน");
      }
    };
    getClass();
  }, []);

  useEffect(() => {
    const getSubject = async () => {
      let token = localStorage.getItem('token');
      try {
        const rs = await axios.get('http://localhost:2000/teacher/subject', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAllSubject(rs.data.getSubject);
      } catch (error) {
        toast.error("เกิดข้อผิดพลาดในการโหลดข้อมูลวิชา");
      }
    };
    getSubject();
  }, []);

  const dateNow = new Date().toISOString();
  const yearNow = parseInt(dateNow.split('-')[0]) + 543

  useEffect(() => {
    setInput(prevInput => ({
      ...prevInput,
      datetime: Year ? Year : yearNow
    }));
  }, [Year]);

  const hdlChange = (e) => {
    setInput(prv => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlChangeyear = (e) => {
    const Newvalue = e.target.name === "datetime" ? e.target.value === "2567" ? "2567" : "2568" : e.target.value;
    setYear(Newvalue);
  };

  const hdlSubmit = async (userID) => {
    console.log(userID)
    try {
      if (userClass.length === 0) {
        toast.error("ไม่พบข้อมูลผู้ใช้");
        return;
      }
      const token = localStorage.getItem('token');
      const rs = await axios.post('http://localhost:2000/teacher/term', { ...input, userUser_id: userID }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (rs.status === 200) {
        toast.success("เพิ่มเกรดเรียบร้อย", {
          autoClose: 2000,
        });
        closeModal();
      }
    } catch (err) {
      toast.error("เกิดข้อผิดพลาดในการเพิ่มเกรด");
    }
  };

  const hdlChangeSubject = (e) => {
    setInput(prv => ({ ...prv, subjectSj_id: e.target.value }));
  };

  const hdlSearch = async (e) => {
    e.preventDefault();
    if (input.Class === "") {
      toast.error("กรุณาเลือกชั้นเรียน");
    } else {
      let token = localStorage.getItem('token');
      try {
        const rs = await axios.get(`http://localhost:2000/teacher/user/${input.Class}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserClass(rs.data.getUser);
        setInput(prevInput => ({
          ...prevInput,
          userUser_id: rs.data.getUser.length > 0 ? rs.data.getUser[0].user_id : ''
        }));
      } catch (error) {
        toast.error("เกิดข้อผิดพลาดในการค้นหาผู้ใช้");
      }
    }
  };

  const fetchUserID = async (id) => {
    try {
      const rs = await axios.get(`http://localhost:2000/teacher/getUser/${id}`)
      if (rs.status === 200) {
        setUserByID(rs.data.getUser[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const openModal = (userId) => {
    setModalData({ isVisible: true, userId });
    fetchUserID(userId);
  };

  const closeModal = () => {
    setModalData({ isVisible: false, userId: null });
    setInput(prevInput => ({
      ...prevInput,
      grade: ""
    }));
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <SlibaraTC />
      <ToastContainer />
      <div className="w-4/5 p-6">
        <div className="mb-6">
          <form className="flex flex-col gap-3" onSubmit={hdlSearch}>
            <select name="Class" value={input.Class} onChange={hdlChange} className="p-2 rounded border">
              <option value="">กรุณาเลือกชั้นเรียน</option>
              {allClass.map(el => (
                <option key={el.cl_id} value={el.cl_id}>{el.classroom}</option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              ค้นหา
            </button>
          </form>
        </div>
        <form className="space-y-4 bg-white p-6 rounded-lg shadow-md">
          {userClass.length !== 0 ? (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">User ID</th>
                  <th className="py-2">First Name</th>
                  <th className="py-2">Last Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Subject</th>
                </tr>
              </thead>
              <tbody>
                {userClass.map((el, index) => (
                  <tr key={el.user_id}>
                    <td className="border px-4 py-2">{el.user_id}</td>
                    <td className="border px-4 py-2">{el.frist_name}</td>
                    <td className="border px-4 py-2">{el.last_name}</td>
                    <td className="border px-4 py-2">{el.email}</td>
                    <td className="border px-4 py-2">
                      <button type="button" className="bg-blue-500 text-white p-2 rounded" onClick={() => openModal(el.user_id)}>เลือก</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">ไม่พบข้อมูลนักเรียน</p>
          )}
        </form>
        {modalData.isVisible && (
          <dialog open className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">เลือกวิชา</h3>
                <button className="text-gray-500 hover:text-gray-700" onClick={closeModal}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className='flex justify-end mb-4'>
                <p>{userByID.frist_name} {userByID.last_name}</p>
              </div>
              <select name="subjectSj_id" onChange={hdlChangeSubject} className="p-2 rounded border w-full mb-4">
                <option value="">กรุณาเลือกวิชา</option>
                {allSubject.map(sub => (
                  <option key={sub.sj_id} value={sub.sj_id}>{sub.subject}</option>
                ))}
              </select>
              <label htmlFor="grade" className="block">เพิ่มเกรด</label>
              <select
                name="grade"
                value={input.grade}
                onChange={hdlChange}
                className="p-2 rounded border w-full mb-4"
              >
                <option value="">เลือกเกรด</option>
                <option value="4">4</option>
                <option value="3.5">3.5</option>
                <option value="3">3</option>
                <option value="2.5">2.5</option>
                <option value="2">2</option>
                <option value="1.5">1.5</option>
                <option value="1">1</option>
                <option value="0">0</option>
                <option value="ร">ร</option>
              </select>

              <label htmlFor="datetime" className="block">ปีการศึกษา</label>
              <input type="text" name="datetime" value={input.datetime} onChange={hdlChange} className="p-2 rounded border w-full mb-4" />
              <div className="modal-action">
                <button type="submit" className="bg-blue-500 text-white p-2 rounded" onClick={() => hdlSubmit(userByID.user_id)} >บันทึก</button>
                <button type="button" className="bg-red-500 text-white p-2 rounded" onClick={closeModal}>ยกเลิก</button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
}
