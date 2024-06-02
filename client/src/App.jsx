import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/form/Sidebar";
import { locations } from "./constants";
import { useGetOperatorProfileQuery } from "./store/api/operatorAPI";
import Loader from "./components/ui/loader";
import { Suspense, lazy } from "react";

const ErrorPage = lazy(() => import("./pages/Error/NotFound"));
const ClubLogin = lazy(() => import("./pages/Login/ClubLogin"));
const ClubSignUp = lazy(() => import("./pages/Signup/ClubSignUp"));
const ClubSignUpOtp = lazy(() => import("./pages/Signup/Club-signUp-otp"));
const ClubSignUpOtpResend = lazy(() => import("./pages/Signup/Club-signUp-otp-resend"));
const OperatorSignup = lazy(() => import("./pages/Signup/OperatorSignup"));
const OperatorSignUpOtp = lazy(() => import("./pages/Signup/Operator-forgot-pass"));
const OperatorResetPass = lazy(() => import("./pages/Signup/Operator-forgotpass-reset"));
const OperatorResetPassMail = lazy(() => import("./pages/Signup/Operator-forgotpass-mail"));
const OperatorLogin = lazy(() => import("./pages/Login/OperatorLogin"));
const Dashboard = lazy(() => import("./pages/Home/Dashboard"));
const Member = lazy(() => import("./pages/Home/Member"));
const Coupon = lazy(() => import("./pages/Home/Coupon"));
const Settings = lazy(() => import("./pages/Home/Settings"));
const Profile = lazy(() => import("./pages/Home/Profile"));
const SettingsAdmin = lazy(() => import("./pages/Home/SettingsAdmin"));
const SettingsAdminTemp = lazy(() => import("./pages/Home/SettingsAdminTemp"));
const ClubForgotPass = lazy(() => import("./pages/Signup/Club-forgot-pass"));
const ClubLoginTemp = lazy(() => import("./pages/Login/Club-login-temp"));

function App() {
  const location = useLocation();
  // const navigate = useNavigate();
  const {
    data: profiledata,
    isError,
    isLoading,
  } = useGetOperatorProfileQuery();

  // if (!profiledata && !isLoading) navigate("/login/club");


  if (isLoading) return <Loader />;

console.log(profiledata, isLoading, isError);

  return (
    <Suspense fallback={<Loader/>}>
      <Toaster />
      {locations.includes(location.pathname) ? (
        <Sidebar profiledata={profiledata} />
      ) : null}
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

          {profiledata && profiledata.data && (
            <>
              <Route path="/member" element={<Member />} />
              <Route path="/coupon" element={<Coupon />} />
              <Route path="/profile" element={<Profile />} />
            </>
          )}
        </>

        {/* Routes for Settings*/}
        <>
          {profiledata &&
            profiledata.data &&
            profiledata.data.role === "admin" && (
              <Route
                path="/settings/admin"
                element={
                  <SettingsAdmin
                    profiledata={profiledata}
                    isLoading={isLoading}
                    error={isError}
                  />
                }
              />
            )}
          {profiledata &&
            profiledata.data &&
            profiledata.data.role === "operator" && (
              <Route path="/settings" element={<Settings />} />
            )}
          <Route path="/settings/admin/temp" element={<SettingsAdminTemp />} />
        </>

        {/* Routes for Club Auths */}
        {!profiledata && (
          <>
            <>
              <Route path="/signup/club" element={<ClubSignUp />} />
              <Route path="/login/club" element={<ClubLogin />} />
              <Route path="/signup/club/otp" element={<ClubSignUpOtp />} />
              <Route
                path="/signup/club/otp/resend"
                element={<ClubSignUpOtpResend />}
              />
              <Route
                path="/login/club/forgotPass"
                element={<ClubForgotPass />}
              />
              <Route path="/login/club/temp" element={<ClubLoginTemp />} />
            </>

            {/* Routes for Operator Auths */}
            <>
              <Route path="/signup/operator" element={<OperatorSignup />} />
              <Route path="/login/operator" element={<OperatorLogin />} />
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
          </>
        )}

        <>
          <Route
            path="*"
            element={
              <ErrorPage
                profiledata={profiledata}
                isLoading={isLoading}
                error={isError}
              />
            }
          />
        </>
      </Routes>
    </Suspense>
  );
}

export default App;
