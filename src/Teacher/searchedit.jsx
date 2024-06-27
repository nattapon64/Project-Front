import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SlibaraTC from './slibaraTC';
import { toast } from 'react-toastify';

function SearchEdit() {
    const [search, setSearch] = useState({
        username: "",
        datetime: ""
    })
    const [data, setData] = useState([])
    const [allClass, setAllClass] = useState([]);
    const [allSubject, setAllSubject] = useState([]);
    const [userClass, setUserClass] = useState([]);
    const [Year, setYear] = useState("");
    const [input, setInput] = useState({
        username: '',
        grade: '',
        subjectSj_id: '',
        datetime: ''
    });
    const [modalData, setModalData] = useState({ isVisible: false, userId: null });
    const [userByID, setUserByID] = useState({});
    const [gradeByUID, setGradeByUID] = useState("")

    useEffect(() => {
        document.title = 'Complete';
        const getClass = async () => {
            let token = localStorage.getItem('token');
            const rs = await axios.get('http://localhost:2000/teacher/class', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAllClass(rs.data.getClass || []);
        };
        getClass();
    }, []);

    useEffect(() => {
        const getSubject = async () => {
            let token = localStorage.getItem('token');
            const rs = await axios.get('http://localhost:2000/teacher/subject', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAllSubject(rs.data.getSubject || []);
        };
        getSubject();
    }, []);

    const dateNow = new Date().toISOString();
    const yearNow = parseInt(dateNow.split('-')[0]) + 543;

    useEffect(() => {
        setInput(prevInput => ({
            ...prevInput,
            datetime: Year ? Year : yearNow
        }));
    }, [Year]);

    const hdlChange = (e) => {
        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }));
    };

    const hdlChangeSearch = (e) => {
        setSearch(prv => ({ ...prv, [e.target.name]: e.target.value }));
    };

    const hdlChangeyear = (e) => {
        const Newvalue = e.target.name === "datetime" ? (e.target.value === "2567" ? "2567" : "2568") : e.target.value;
        setYear(Newvalue);
    };

    const hdlSubmit = async (e) => {
        e.preventDefault();
        try {
            if (userClass.length === 0) {
                alert("ไม่พบข้อมูลผู้ใช้");
                return;
            }
            const token = localStorage.getItem('token');
            const rs = await axios.post('http://localhost:2000/teacher/term', { ...input, userUser_id: userClass[0].user_id }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (rs.status === 200) {
                alert("เพิ่มเกรดเรียบร้อย");
                closeModal();
            }
        } catch (err) {
            alert(err.message);
        }
    };

    const hdlChangeSubject = (e) => {
        setInput(prv => ({ ...prv, subjectSj_id: e.target.value }));
    };

    const hdlSearch = async (e) => {
        e.preventDefault();
        if (search.username === "") {
            alert("กรุณากรอกรหัสผู้ใช้งาน");
        } else {
            let token = localStorage.getItem('token');
            try {
                const rs = await axios.get(`http://localhost:2000/teacher/getTermUser?search=${search.username}&year=${search.datetime}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(rs.data.getTerm);
                const users = rs.data.getTerm || [];
                setUserClass(users);
                // console.log(userClass)
                // setInput(prevInput => ({
                //     ...prevInput,
                //     userUser_id: users.length > 0 ? users[0].user_id : ''
                // }));
            } catch (error) {
                console.log('ไม่พบผู้ใช้งาน:', error);
                // alert('ไม่พบผู้ใช้งาน');
            }
        }
    };

    const fetchUserID = async (id) => {
        try {
            const rs = await axios.get(`http://localhost:2000/teacher/getUser/${id}`);
            if (rs.status === 200) {
                setUserByID(rs.data.getUser[0]);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const openModal = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const rs = await axios.get(`http://localhost:2000/teacher/term/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setGradeByUID(rs.data.gradeUID);
            fetchUserID(userId);
            document.getElementById(`my_modal_${userId}`).showModal();

            console.log(gradeByUID)
        } catch (err) {
            console.log(err.response.data.message);
        }
    };

    const closeModal = () => {
        setModalData({ isVisible: false, userId: null });
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            <SlibaraTC />
            <div className="w-4/5 p-6">
                <div className="mb-6">
                    <form className="flex flex-col gap-3" onSubmit={hdlSearch}>
                        <input
                            type="text"
                            name="username"
                            value={search.username}
                            onChange={hdlChangeSearch}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter username"
                        />
                        <input
                            type="text"
                            name="datetime"
                            value={search.datetime}
                            onChange={hdlChangeSearch}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter Year"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            ค้นหา
                        </button>
                    </form>
                </div>
                <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
                    {userClass.length !== 0 ? (
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2">username</th>
                                    <th className="py-2">First Name</th>
                                    <th className="py-2">Last Name</th>
                                    <th className="py-2">Email</th>
                                    <th className="py-2">Subject</th>
                                </tr>
                            </thead>
                            <tbody>
                                {console.log(userClass)}
                                {userClass.map((el, index) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2">{el.user.username}</td>
                                        <td className="border px-4 py-2">{el.user.frist_name}</td>
                                        <td className="border px-4 py-2">{el.user.last_name}</td>
                                        <td className="border px-4 py-2">{el.user.email}</td>
                                        <td className="border px-4 py-2">
                                            <button className="btn btn-primary" onClick={() => openModal(el.tr_id)}>แก้ไข</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center">ไม่พบข้อมูลนักเรียน</p>
                    )}
                </div>
            </div>
            {userClass.map((term, index) => (
                <Modal key={index} term={term} gradeByUID={gradeByUID} />
            ))}
        </div>
    );
}

const Modal = ({ term, gradeByUID }) => {

    const modalId = `my_modal_${term.tr_id}`;

    const [editData, setEditData] = useState({
        datetime: gradeByUID?.datetime,
        grade: gradeByUID?.grade,
        subjectSj_id: gradeByUID?.subject?.subject,
        userUser_id: gradeByUID?.userUser_id,
    });

    const [isEditing, setEditing] = useState(false);

    const handleEditClick = () => {
        setEditData({ ...gradeByUID });
        setEditing(true);
    };

    const handleSaveClick = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = `http://localhost:2000/teacher/updategrade/${gradeByUID.tr_id}`;
            const rs = await axios.patch(apiUrl, editData);

            if (rs.status === 200) {
                toast.success("แก้ไขข้อมูลสำเร็จ", {
                    autoClose: 2000,
                });
                setEditing(false);
                document.getElementById(modalId).close();
            }
        } catch (err) {
            console.log("เกิดข้อผิดพลาดในการแก้ไข", err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleBack = (id) => {
        if (isEditing) {
            setEditing(false);
        }
        document.getElementById(id).close();
    };

    return (
        <dialog id={modalId} className='modal'>
            <div className='modal-box'>
                <h3 className='font-bold text-lg mb-5'>
                    แก้ไขผู้ใช้งาน {term.user_id}
                </h3>

                <h3 className='text-lg mb-5'>
                    datetime:
                    {isEditing ? (
                        <input
                            className='px-2 py-1 rounded-md w-4/5'
                            type='text'
                            name='datetime'
                            value={editData.datetime}
                            onChange={handleChange}
                        />
                    ) : (
                        gradeByUID?.datetime
                    )}
                </h3>

                <h3 className='text-lg mb-5'>
                    grade:
                    {isEditing ? (
                        <input
                            className='px-2 py-1 rounded-md w-4/5'
                            type='text'
                            name='grade'
                            value={editData.grade}
                            onChange={handleChange}
                        />
                    ) : (
                        gradeByUID?.grade
                    )}
                </h3>

                <h3 className='text-lg flex gap-2 mb-5 w-full'>
                    วิชา :
                    {isEditing ? (
                        <input
                            className='px-2 py-1 rounded-md w-4/5'
                            type='text'
                            name='subjectSj_id'
                            value={editData.subjectSj_id}
                            onChange={handleChange}
                        />
                    ) : (
                        <p> {gradeByUID?.subject?.subject}</p>
                    )}
                </h3>

                <h3 className='text-lg mb-5'>
                    userUser_id:
                    {isEditing ? (
                        <input
                            className='px-2 py-1 rounded-md w-4/5'
                            type='text'
                            name='userUser_id'
                            value={editData.userUser_id}
                            onChange={handleChange}
                        />
                    ) : (
                        gradeByUID?.userUser_id
                    )}
                </h3>

                <div className='flex justify-end gap-2'>
                    <button
                        type="button"
                        className='btn btn-outline btn-error'
                        onClick={() => handleBack(modalId)}
                    >
                        ย้อนกลับ
                    </button>
                    {isEditing ? (
                        <button
                            className="btn btn-outline btn-info"
                            onClick={handleSaveClick}
                        >
                            บันทึก
                        </button>
                    ) : (
                        <button
                            className="btn btn-outline btn-info"
                            onClick={handleEditClick}
                        >
                            แก้ไข
                        </button>
                    )}
                </div>
            </div>
        </dialog>
    );
};


export default SearchEdit;
