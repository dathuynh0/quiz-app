import { BrowserRouter, Routes, Route } from "react-router";
import SignupPage from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ProtectedPage from "./pages/ProtectedPage";
import HomePage from "./pages/HomePage";
import { Toaster } from "sonner";
import Home from "./components/SideBar/Home";
import Exam from "./components/SideBar/Exam";
import History from "./components/SideBar/History";
import UserInfo from "./components/SideBar/UserInfo";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster richColors />
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SignIn />} />

          {/* protected route */}
          <Route element={<ProtectedPage />}>
            <Route path="/" element={<HomePage />}>
              <Route index element={<Home />} />
              <Route path="/exam" element={<Exam />} />
              <Route path="/history" element={<History />} />
              <Route path="/user" element={<UserInfo />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
