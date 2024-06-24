import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import Slibaradmin from './slibaradmin';
import { toast } from 'react-toastify';

export default function Adduser() {
  const [slClass, setSlClass] = useState([]);
  const [input, setInput] = useState({
    username: "",
    password: "",
    confirmpassword: "",
    frist_name: "",
    last_name: "",
    email: "",
    role: "STUDENT",
    classCl_id: ""
  });

  const fileInput = useRef(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem("token");
        const rs = await axios.get('http://localhost:2000/admin/selectClass', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSlClass(rs.data.slClass);
      } catch (err) {
        console.error(err);
      }
    };
    fetchClasses();
  }, []);

  const hdlChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hdlChangImg = () => {
    const file = fileInput.current.files[0];
    if (file) {
      const fileSize = file.size / (1024 * 1024);
      if (fileSize > 10) {
        alert("รูปภาพมีขนาดเกิน 10 MB");
      }
    }
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(input).some((value) => value === "")) {
      alert("Please enter all input");
    } else {
      try {
        const file = fileInput.current?.files[0];
        const formData = new FormData();
        Object.entries(input).forEach(([key, value]) => {
          formData.append(key, value);
        });
        if (file) {
          formData.append('image', file);
        }

        const token = localStorage.getItem('token');
        const rs = await axios.post('http://localhost:2000/admin/user', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (rs.status === 200) {
          toast.success("เพิ่มข้อมูลสำเร็จ", {
            onClose: () => window.location.reload(),
            autoClose: 2000,
          });
        }
      } catch (err) {
        toast.error("ไม่สามารถเพิ่มข้อมูลได้");
      }
    }
  };

  const hdlReload = () => {
    window.location.reload();
  };

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      <div className='drawer lg:drawer-open'>
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center p-4">
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden mb-4">Open drawer</label>

          <div className="w-full max-w-md p-8 mt-10 bg-white rounded-lg shadow-md">
            <h2 className='text-2xl font-bold text-center mb-6'>เพิ่มผู้ใช้งาน</h2>
            <form onSubmit={hdlSubmit}>
              <div className='mb-4'>
                <label className='block text-gray-700'>Username</label>
                <input className='w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200' type="text" name="username" value={input.username} onChange={hdlChange} />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Password</label>
                <input className='w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200' type="password" name='password' value={input.password} onChange={hdlChange} />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Confirm Password</label>
                <input className='w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200' type="password" name='confirmpassword' value={input.confirmpassword} onChange={hdlChange} />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>คำนำหน้า</label>
                <select className='w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200' name='prefix' onChange={hdlChange}>
                  <option hidden>เลือกคำนำหน้า</option>
                  <option value="boy">เด็กชาย</option>
                  <option value="girl">เด็กหญิง</option>
                  <option value="MR">นาย</option>
                  <option value="miss">นางสาว</option>
                </select>
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>ชื่อ</label>
                <input className='w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200' type="text" name='frist_name' value={input.frist_name} onChange={hdlChange} />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>นามสกุล</label>
                <input className='w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200' type="text" name='last_name' value={input.last_name} onChange={hdlChange} />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Email</label>
                <input className='w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200' type="Email" name='email' value={input.email} onChange={hdlChange} />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Photo</label>
                <input className='w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200' type="file" ref={fileInput} accept='image/*' onChange={hdlChangImg} />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>เลือกปีการศึกษา</label>
                <select className='w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200' name="classCl_id" value={input.classCl_id} onChange={hdlChange}>
                  <option value="" hidden>เลือกปีการศึกษา</option>
                  {slClass.map((cl) => (
                    <option key={cl.cl_id} value={cl.cl_id}>{cl.classroom}</option>
                  ))}
                </select>
              </div>
              <div className='flex justify-between'>
                <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700" type="submit">ยืนยัน</button>
                <button className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700" type="button" onClick={hdlReload}>ยกเลิก</button>
              </div>
            </form>
          </div>
        </div>
        <Slibaradmin />
      </div>
    </div>
  )
}
