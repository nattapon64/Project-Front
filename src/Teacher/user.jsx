import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SlibaraTC from './slibaraTC';
import { Link } from 'react-router-dom';

export default function User() {
    const [data, setData] = useState([]);
    const [slClass, setSlClass] = useState([]);
    const [studentCount, setStudentCount] = useState(0);

    useEffect(() => {
        fetchClasses();
        let token = localStorage.getItem("token");

        axios.get(`http://localhost:2000/teacher/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                const students = res.data.getUser.filter(user => user.role === "STUDENT");
                setData(students);
                setStudentCount(students.length);
            })
            .catch(err => console.log(err));
    }, []);

    console.log(data)

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

    return (
        <div className="flex min-h-screen bg-gray-100">
            <SlibaraTC/>
            <div className="w-4/5 p-6">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-center text-2xl font-bold mb-6">รายชื่อ</h3>
                    <div className="text-center mb-6">
                        <h4 className="text-lg font-semibold">จำนวนนักเรียนทั้งหมด: <span className="text-blue-600">{studentCount}</span></h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 border">รหัสนักเรียน</th>
                                    <th className="px-4 py-2 border">First Name</th>
                                    <th className="px-4 py-2 border">Last Name</th>
                                    <th className="px-4 py-2 border">Class</th>
                                    <th className="px-4 py-2 border">Image</th>
                                    <th className="px-4 py-2 border">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((user, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="px-4 py-2 border">{user.username}</td>
                                        <td className="px-4 py-2 border">{user.frist_name}</td>
                                        <td className="px-4 py-2 border">{user.last_name}</td>
                                        <td className="px-4 py-2 border">{user.class.classroom}</td>
                                        <td className="px-4 py-2 border"><img className="h-20 w-20 object-cover rounded" src={user.IMG} alt="User" /></td>
                                        <td className="px-4 py-2 border">{user.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
