import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SlibraSTD from './slibraSTD';

function subjectSTD() {
    const [data, setData] = useState([]);

    useEffect(() => {
        let token = localStorage.getItem("token");

        axios.get(`http://localhost:2000/student/getSubjectUser`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => setData(res.data.getSubject))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="flex">
            <SlibraSTD/>
            <div className="w-4/5 h-screen">
                <div className="mt-3">
                    <h3 className="text-center text-xl font-bold">รายชื่อ</h3>
                    <table className="w-full border-collapse border border-gray-400">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 border border-gray-400">รหัสวิชา</th>
                                <th className="px-4 py-2 border border-gray-400">วิชา</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((subject, index) => (
                                <tr key={index + 1}>
                                    <td className="px-4 py-2 border border-gray-400">{subject.sub_code}</td>
                                    <td className="px-4 py-2 border border-gray-400">{subject.subject}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default subjectSTD