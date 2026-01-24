import { BrowserRouter, Routes, Route } from "react-router";
import SignupPage from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ProtectedPage from "./pages/ProtectedPage";
import HomePage from "./pages/HomePage";
import { Toaster } from "sonner";

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
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
