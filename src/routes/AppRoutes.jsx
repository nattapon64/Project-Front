import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Header from '../Login/header'
import Header2 from '../Header'
import Login from '../Login/body'
import Teacher1 from '../Teacher/teacher1'
import Complete from '../Teacher/complete'
import Footer from '../Login/footer'
import Teacher2 from '../Teacher/teacher2'
import Admin1 from '../Admin/admin1'
import Student from '../student/student'
import Adduser from '../Admin/Adduser'
import Addsubject from '../Admin/Addsubject'
import Deluser from '../Admin/Deluser'
import User from '../Teacher/user'
import Subject from '../Teacher/subject'


const guestRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <Outlet />
      <Footer />
    </>,
    children: [
      { index: true, element: <Login /> },
      { path: '/register', element: <p>TEST</p> },
      { path: '/complete', element: <Complete /> },
      { path: '*', element: <p>PAGE NOT FOUND</p>},
    ]
  }
])

const userRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header2 />
      <Outlet />
    </>,
    children: [
      { index: true, element: <Student /> },
      { path: '*', element: <p>PAGE NOT FOUND</p>},
    ]
  }
])

const adminRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header2 />
      <Outlet />
    </>,
    children: [
      { index: true, element: <Admin1 /> },
      { path: '/News', element: <Admin1 /> },
      { path: '/add', element: <Adduser /> },
      { path: '/Addsub', element: <Addsubject/>},
      { path: '/Deluser', element: <Deluser/>},
      { path: '*', element: <p>PAGE NOT FOUND</p>},
    ]
  }
])
const teacherRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header2 />
      <Outlet />
    </>,
    children: [
      { index: true, element: <Teacher1 /> },
      { path: '/complete', element: <Complete /> },
      { path: '/teacher2', element: <Teacher2 /> },
      { path: '/user', element: <User /> },
      { path: '/subject', element: <Subject /> },
      { path: '*', element: <p>PAGE NOT FOUND</p>},
    ]
  }
])



export default function AppRouter() {
  const { user } = useAuth();
  const finalRouter = user?.user_id ? user.role === "ADMIN" ? adminRouter : user.role === "TEACHER" ? teacherRouter : userRouter : guestRouter;
  return <RouterProvider router={finalRouter} />;
}
