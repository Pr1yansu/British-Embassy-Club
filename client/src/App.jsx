import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ClubSignUp from "./pages/Signup/ClubSignUp";
import ClubLogin from "./pages/Login/ClubLogin";
import OperatoLogin from "./pages/Login/OperatorLogin";
import ClubSignUpOtp from "./pages/Signup/Club-signUp-otp";
import ClubSignUpOtpResend from "./pages/Signup/Club-signUp-otp-resend";
import OperatorSignup from "./pages/Signup/OperatorSignup";
import OperatorSignUpOtp from "./pages/Signup/Operator-forgot-pass";
import OperatorResetPass from "./pages/Signup/Operator-forgotpass-reset";
import OperatorResetPassMail from "./pages/Signup/Operator-forgotpass-mail";
import Dashboard from "./pages/Home/Dashboard";
import Member from "./pages/Home/Member";
import ModalHome from "./components/modals/modalHome";
import { Toaster } from "react-hot-toast";
import Coupone from "./pages/Home/Coupone";
import Settings from "./pages/Home/Settings";
import Profile from "./pages/Home/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/modal" element={<ModalHome />} />
          <Route path="/member" element={<Member />} />
          <Route path="/coupone" element={<Coupone />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/ClubSignUp" element={<ClubSignUp />} />
          <Route path="/ClubLogin" element={<ClubLogin />} />
          <Route path="/ClubSignupOtp" element={<ClubSignUpOtp />} />
          <Route
            path="/ClubSignUpOtpResend"
            element={<ClubSignUpOtpResend />}
          />
          
          <Route path="/OperatorLogin" element={<OperatoLogin />} />
          <Route path="/OperatorSignUp" element={<OperatorSignup />} />
          <Route
            path="/OperatorSignUpForgotPass"
            element={<OperatorSignUpOtp />}
          />
          <Route
            path="/OperatorResetPassMail"
            element={<OperatorResetPassMail />}
          />
          <Route path="/OperatorResetPass" element={<OperatorResetPass />} />

          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
