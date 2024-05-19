import React from "react";
import Sidebar from "../../components/ui/Sidebar";
import ChangePassword from "../../components/form/ChangePassword";
import ButtonGroup from "../../components/ui/ButtonGroup";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TbLogout } from "react-icons/tb";

const Settings = () => {
  return (
    <>
      <div className="background bg-cover bg-center w-full h-screen grid grid-rows-12 grid-cols-12 gap-4">
        <Sidebar />
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
          />
        </div>
      </div>
    </>
  );
};

export default Settings;