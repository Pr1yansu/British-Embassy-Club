import { Route, Routes, useLocation } from "react-router-dom";
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
import { Toaster } from "react-hot-toast";
import Coupon from "./pages/Home/Coupon";
import Settings from "./pages/Home/Settings";
import Profile from "./pages/Home/Profile";
import SettingsAdmin from "./pages/Home/SettingsAdmin";
import SettingsAdminTemp from "./pages/Home/SettingsAdminTemp";
import Sidebar from "./components/form/Sidebar";
import { locations } from "./constants";
import ClubForgotPass from "./pages/Signup/Club-forgot-pass";
import ClubLoginTemp from "./pages/Login/Club-login-temp";
import { useGetOperatorProfileQuery } from "./store/api/operatorAPI";
import ErrorPage from "./pages/Error/NotFound";

function App() {
  const location = useLocation();
  const {
    data: profiledata,
    isError,
    isLoading,
  } = useGetOperatorProfileQuery();

  // console.log(profiledata);

  return (
    <>
      <Toaster />
      {locations.includes(location.pathname) ? <Sidebar profiledata={profiledata} /> : null}
      <Routes>
        {/*Routes for Main pages */}
        <>
          <Route
            path="/"
            element={
              <Dashboard
                profiledata={profiledata}
                isLoading={isLoading}
                error={isError}
              />
            }
          />

          <Route path="/member" element={<Member />} />
          <Route path="/coupon" element={<Coupon />} />
          <Route path="/profile" element={<Profile />} />
        </>

        {/* Routes for Settings*/}
        <>
          <Route path="/settings/admin" element={<SettingsAdmin />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/admin/temp" element={<SettingsAdminTemp />} />
        </>

        {/* Routes for Club Auths */}
        <>
          <Route path="/signup/club" element={<ClubSignUp />} />
          <Route path="/login/club" element={<ClubLogin />} />
          <Route path="/signup/club/otp" element={<ClubSignUpOtp />} />
          <Route
            path="/signup/club/otp/resend"
            element={<ClubSignUpOtpResend />}
          />
          <Route path="/login/club/forgotPass" element={<ClubForgotPass />} />
          <Route path="/login/club/temp" element={<ClubLoginTemp />} />
        </>

        {/* Routes for Operator Auths */}
        <>
          <Route path="/signup/operator" element={<OperatorSignup />} />
          <Route path="/login/operator" element={<OperatoLogin />} />
          <Route
            path="/login/operator/forgotPass"
            element={<OperatorSignUpOtp />}
          />
          <Route
            path="/login/operator/forgotPass/mail"
            element={<OperatorResetPassMail />}
          />
          <Route
            path="/operator/reset-password/:token"
            element={<OperatorResetPass />}
          />
        </>
        <>
          <Route path="*" element={<ErrorPage />} />
        </>
      </Routes>
    </>
  );
}

export default App;
