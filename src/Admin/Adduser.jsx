import axios from 'axios'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Adduser() {

  const [input, setInput] = useState({
    username: "",
    password: "",
    confirmpassword: "",
    frist_name: "",
    last_name: "",
    email: "",
    IMG: "",
    role: "STUDENT",
    classCl_id: ""
  })

  const hdlChange = e => {
    setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
  }

  const hdlSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(input).some(value => value !== "user_image" && input[value] === "")) {
      alert("Please ener input");
    } else {
      try {
        const file = fileInput.current?.files[0];
        const formData = new FormData();

        Object.entries(input).forEach(([key, value]) => {
          formData.append(key, value)
        })

        if (file) {
          formData.append('image', file)
        }

        const token = localStorage.getItem('token')
        const rs = await axios.post('http://localhost:2000/admin/user', formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (rs.status === 200) {
          alert("Create user success")
          location.reload()
        }
        console.log(rs)
      } catch (err) {
        alert(err.massage)
      }
    }
  }
  const hdlReload = () => {
    window.location.reload()
  }

  const fileInput = useRef(null);

  return (
    <div>
      <div className='flex'>
        <div className='flex'>
          <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
              {/* Page content here */}
              <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu p-4 w-80 min-h-full bg-emerald-500 text-base-content text-black">
                {/* Sidebar content here */}
                <Link to='/add'><li><a>สมัคร</a></li></Link>
                <Link to='/Addsub'><li><a>เพิ่มรายวิชา</a></li></Link>
                <Link to='/Deluser'><li><a>แก้ไขผู้ใช้งาน</a></li></Link>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-[15px] gap-2 min-h-screen w-[10000px] ">
          <label>Username</label>
          <input className='w-[250px] h-[35px] rounded-xl' type="text" name="username" value={input.username} onChange={hdlChange} />
          <label>Password</label>
          <input className='w-[250px] h-[35px] rounded-xl' type="password" name='password' value={input.password} onChange={hdlChange} />
          <label>confirm Password</label>
          <input className='w-[250px] h-[35px] rounded-xl' type="password" name='confirmpassword' value={input.confirmpassword} onChange={hdlChange} />
          <label>คำนำหน้า</label>
          <select className='w-[250px] h-[35px] rounded-xl' name='prefix' id='' onClick={hdlChange}>
            <option hidden>เลือกคำนำหน้า</option>
            <option value="boy">เด็กชาย</option>
            <option value="girl">เด็กหญิง</option>
            <option value="MR">นาย</option>
            <option value="miss">นางสาว</option>
          </select>
          <label>ชื่อ</label>
          <input className='w-[250px] h-[35px] rounded-xl' type="text" name='frist_name' value={input.frist_name} onChange={hdlChange} />
          <label>นามสกุล</label>
          <input className='w-[250px] h-[35px] rounded-xl' type="text" name='last_name' value={input.last_name} onChange={hdlChange} />
          <label>Email</label>
          <input className='w-[250px] h-[35px] rounded-xl' type="Email" name='email' value={input.email} onChange={hdlChange} />
          <label>Photo</label>
          <input className='w-[250px] h-[35px]' type="file" ref={fileInput} accept='image/*' />
          <label>Class</label>
          <input className='w-[250px] h-[35px] rounded-xl' type="" name='classCl_id' value={input.classCl_id} onChange={hdlChange} />
        </div>
        <div className='flex gap-7 p-6 bg-indigo-500'>
          <button className="btn btn-outline btn-info" onClick={hdlSubmit}>ยืนยัน</button>
          <button className="btn btn-outline btn-info" onClick={hdlReload}>ยกเลิก</button>
        </div>
      </div>
    </div>
  )
}
