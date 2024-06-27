import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Header from '../Login/header'
import Header2 from '../Header'
import Login from '../Login/body'
import Complete from '../Teacher/complete'
import Footer from '../Login/footer'
import MainAM from '../Admin/MainAM'
import Student from '../student/student'
import Adduser from '../Admin/Adduser'
import Addsubject from '../Admin/Addsubject'
import Deluser from '../Admin/Deluser'
import User from '../Teacher/user'
import Subject from '../Teacher/subject'
import Slibaradmin from '../Admin/slibaradmin'
import Searchedit from '../Teacher/searchedit'
import SlibraSTD from '../student/SlibraSTD'
import ProfileSTD from '../student/profileSTD'
import SubjectSTD from '../student/subjectSTD'
import GardeSTD from '../student/gardeSTD'
import SlibaraTC from '../Teacher/slibaraTC'
import MainTC from '../Teacher/MainTC'

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
      { path: '/Student', element: <Student/>},
      { path: '/SlibraSTD', element: <SlibraSTD/>},
      { path: '/ProfileSTD', element: <ProfileSTD/>},
      { path: '/SubjectSTD', element: <SubjectSTD/>},
      { path: '/GardeSTD', element: <GardeSTD/>},
      { path: '/SlibaraTC', element: <SlibaraTC/>},
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
      { index: true, element: <MainAM /> },
      { path: '/slibaradmin', element: <Slibaradmin /> },
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
      { index: true, element: <MainTC /> },
      { path: '/complete', element: <Complete /> },
      { path: '/user', element: <User /> },
      { path: '/searchedit', element: <Searchedit /> },
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
