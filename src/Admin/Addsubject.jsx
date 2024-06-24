import axios from 'axios'
import React, { useRef, useState } from 'react'
// import { Link } from 'react-router-dom'
import Slibaradmin from './slibaradmin'

export default function Addsubject() {
    const [input, setInput] = useState({
        sub_code: "",
        subject: "",
        credit: ""
    })

    const hdlChange = e => {
        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
    }

    const hdlSubmit = async (e) => {
        e.preventDefault();
        console.log(input)
        try {
            const token = localStorage.getItem('token')
            const rs = await axios.post('http://localhost:2000/admin/subject', input, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (rs.status === 200) {
                alert("Create subject success")
            }
            console.log(rs)
        } catch (err) {
            alert(err.massage)
        }
    }
    const hdlReload = () => {
        window.location.reload()
    }

    return (
        <div className='min-h-screen bg-gray-100'>
            <div className='drawer lg:drawer-open'>
                <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
                <div className='drawer-content flex flex-col items-center'>
                    {/* Page content here */}
                    <label htmlFor='my-drawer-2' className='btn btn-primary drawer-button lg:hidden'>Open drawer</label>

                    <div className='w-full max-w-lg p-8 mt-10 bg-white rounded-lg shadow-md'>
                        <h2 className='text-2xl font-bold text-center mb-6'>เพิ่มรายวิชา</h2>
                        <form onSubmit={hdlSubmit}>
                            <div className='mb-4'>
                                <label className='block text-gray-700'>รหัสวิชา</label>
                                <input className='w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200' type='text' name='sub_code' value={input.sub_code} onChange={hdlChange} />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700'>วิชา</label>
                                <input className='w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200' type='text' name='subject' value={input.subject} onChange={hdlChange} />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700'>หน่วยกิต</label>
                                <input className='w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200' type='text' name='credit' value={input.credit} onChange={hdlChange} />
                            </div>
                            <div className='flex justify-between'>
                                <button className='px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700' type='submit'>ยืนยัน</button>
                                <button className='px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700' type='button' onClick={hdlReload}>ยกเลิก</button>
                            </div>
                        </form>
                    </div>
                </div>
                <Slibaradmin />
            </div>
        </div>
    )
}
