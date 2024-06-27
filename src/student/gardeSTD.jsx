import React, { useEffect, useState } from 'react';
import SlibraSTD from './SlibraSTD';
import axios from 'axios';

function GradeSTD() {
    const [data, setData] = useState([]);
    const [gpa, setGpa] = useState(null);
    const [gpaByYear, setGpaByYear] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get(`http://localhost:2000/student/getTermSTD`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            const termData = res.data.getTerm;
            setData(termData);
            calculateGPA(termData);
        }).catch(err => console.error(err));
    }, []);

    const calculateGPA = (data) => {
        if (data.length === 0) {
            setGpa(null);
            setGpaByYear({});
            return;
        }

        let totalPoints = 0;
        let totalCredits = 0;
        const gpaByYear = {};

        data.forEach(el => {
            const grade = parseFloat(el.grade);
            const credits = 3; // assuming each subject has 3 credits, adjust if necessary
            totalPoints += grade * credits;
            totalCredits += credits;

            // Group by year
            const year = el.datetime;
            if (!gpaByYear[year]) {
                gpaByYear[year] = {
                    totalPoints: 0,
                    totalCredits: 0
                };
            }
            gpaByYear[year].totalPoints += grade * credits;
            gpaByYear[year].totalCredits += credits;
        });

        const overallGpa = totalPoints / totalCredits;
        setGpa(overallGpa.toFixed(2)); // round to two decimal places
        setGpaByYear(gpaByYear);
    };

    const groupByYear = (data) => {
        return data.reduce((acc, item) => {
            const year = item.datetime;
            if (!acc[year]) {
                acc[year] = [];
            }
            acc[year].push(item);
            return acc;
        }, {});
    };

    const groupedData = groupByYear(data);

    return (
        <div className="flex flex-col md:flex-row">
            <SlibraSTD />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Grade Table</h1>
                {data.length === 0 ? (
                    <p className="text-center text-xl">ไม่มีผลการเรียน</p>
                ) : (
                    <div>
                        {Object.keys(groupedData).map((year, index) => (
                            <div key={index} className="mb-6">
                                <h2 className="text-xl font-semibold mt-4">Year {year}</h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full border border-gray-300 divide-y divide-gray-300 mt-2">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-4 py-2 border border-gray-300">รหัสวิชา</th>
                                                <th className="px-4 py-2 border border-gray-300">วิชา</th>
                                                <th className="px-4 py-2 border border-gray-300">เกรด</th>
                                                <th className="px-4 py-2 border border-gray-300">ปีการศึกษา</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {groupedData[year].map((el, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-300 text-center">{el.subject.sub_code}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-300 text-center">{el.subject.subject}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-300 text-center">{el.grade}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-300 text-center">{el.datetime}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {gpaByYear[year] && (
                                    <p className="text-center text-xl font-bold mt-4">GPA: {(gpaByYear[year].totalPoints / gpaByYear[year].totalCredits).toFixed(2)}</p>
                                )}
                            </div>
                        ))}
                        <p className="text-center text-xl font-bold mt-4">Overall GPA: {gpa}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GradeSTD;
