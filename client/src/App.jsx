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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/ClubSignup" element={<ClubSignUp />} />
          <Route path="/ClubLogin" element={<ClubLogin />} />
          <Route path="/ClubSignupOtp" element={<ClubSignUpOtp />} />
          <Route path="/ClubSignUpOtpResend" element={<ClubSignUpOtpResend />} />
          <Route path="/OperatorLogin" element={<OperatoLogin />} />
          <Route path="/OperatorSignUp" element={<OperatorSignup />} />
          <Route path="/OperatorSignUpForgotPass" element={<OperatorSignUpOtp/>}/>
          <Route path="/OperatorResetPass" element={<OperatorResetPass/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
