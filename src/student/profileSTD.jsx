import React, { useEffect, useState } from 'react';
import SlibraSTD from './slibraSTD';
import axios from 'axios';

function ProfileSTD() {
    const [data, setData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        newPassword: "",
        retypeNewPass: ""
    });

    useEffect(() => {
        let token = localStorage.getItem('token');

        axios.get(`http://localhost:2000/student/getStudent`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                // console.log(res.data.userId);
                setData(res.data.userId || {});
            })
            .catch(err => console.log(err));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let token = localStorage.getItem('token');

        console.log(formData)

        axios.patch(`http://localhost:2000/student/resetPassword/password/${data.user_id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data);
                setShowModal(false);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='flex bg-gray-100 min-h-screen'>
            <SlibraSTD />
            <div className="w-full p-6">
                <table className="table-auto w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-4">Username</th>
                            <th className="p-4">First Name</th>
                            <th className="p-4">Last Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Image</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && (
                            <tr key={data.id} className="border-t bg-gray-50 hover:bg-gray-100 transition-colors">
                                <td className="p-4">{data.username}</td>
                                <td className="p-4">{data.frist_name}</td>
                                <td className="p-4">{data.last_name}</td>
                                <td className="p-4">{data.email}</td>
                                <td className="p-4">
                                    <img className="max-h-24 rounded-full mx-auto" src={data.IMG} alt="user" />
                                </td>
                                <td className="p-4 text-center">{data.role}</td>
                                <td className="p-4 text-center">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                                        onClick={() => setShowModal(true)}>
                                        แก้ไขรหัสผ่าน
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center transition-opacity">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">รหัสผ่าน</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">รหัสผ่านใหม่</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">ยืนยันรหัสผ่านใหม่</label>
                                <input
                                    type="password"
                                    name="retypeNewPass"
                                    value={formData.retypeNewPass}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400 transition-colors"
                                    onClick={() => setShowModal(false)}>
                                    ยกเลิก
                                </button>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">ยืนยัน</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileSTD;
