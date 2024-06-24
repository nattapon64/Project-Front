// import Header from "./Login/header";
// import Body from "./Login/body";
// import Footer from "./Login/footer";
// import AuthContext from "./contexts/AuthContexts";
import useAuth from "./hooks/useAuth";
import AppRouter from "./routes/AppRoutes";

function App() {

  const { loading } = useAuth();
  if (loading) {
    return (
      <>
        <p className="flex justify-center text-center items-center">กำลังโหลดข้อมูล</p>
      </>
    )
  }

  return (
    <div className="app">
      <AppRouter />
    </div>
  );
}

export default App;