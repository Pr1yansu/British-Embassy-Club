import React, { useState } from "react";
import Sidebar from "../../components/ui/Sidebar";
import ChangePassword from "../../components/form/ChangePassword";
import ButtonGroup from "../../components/ui/ButtonGroup";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import Warning from "../../components/modals/Warning";
import { useLogoutMutation } from "../../store/api/operatorAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [warning, setWarning] = useState();
   const [logout, { isLoading, isError, data }] = useLogoutMutation();

   const handleLogout = async () => {
     try {
      const data = await logout().unwrap();

      if(data){
        toast.success("Logout Successfully",{
          duration: 2000,
          position: "top-right",
          style: {
            background: "#4BB543",
            color: "#fff",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#4BB543",
          },
        });
        navigate("/login/club");
      }
       
     } catch (error) {
       console.error("Failed to logout:", error);
       toast.error("Logout Failed",{
        duration: 2000,
        position: "top-right",
        style: {
          background: "#FF0000",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#FF0000",
        },
      });
     }
   };
  return (
    <>
      <div className="background bg-cover bg-center">
        <div className="container w-full h-screen grid grid-rows-12 grid-cols-12 gap-4">
          <ChangePassword colStart={"col-start-5"} colEnd={"col-end-9"} />
          <div className="row-start-11 row-end-12 col-start-8 col-end-12 flex gap-4 justify-center">
            <ButtonGroup
              textColor={"text-red-600"}
              HovertextColor={"hover:text-white"}
              toggle={false}
              color={"bg-white"}
              HoverColor={"hover:bg-red-600"}
              name={"Delete Account"}
              icon={<IoIosCloseCircleOutline />}
              Hovershadow={"hover:shadow-danger_shadow"}
              shadow={"shadow-danger_shadow"}
              onClick={() => setWarning(true)}
            />
            <ButtonGroup
              textColor={"text-red-600"}
              HovertextColor={"hover:text-white"}
              toggle={false}
              color={"bg-white"}
              HoverColor={"hover:bg-red-600"}
              name={"Logout"}
              icon={<TbLogout />}
              Hovershadow={"hover:shadow-danger_shadow"}
              shadow={"shadow-danger_shadow"}
              onClick={handleLogout}
            />
            {warning && <Warning onModal={() => setWarning(false)} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
