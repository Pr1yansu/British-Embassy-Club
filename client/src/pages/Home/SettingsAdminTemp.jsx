import React from "react";
import Sidebar from "../../components/ui/Sidebar";
import ChangePassword from "../../components/form/ChangePassword";
import UserManagement from "../../components/modals/UserManagement";
import ButtonGroup from "../../components/ui/ButtonGroup";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
const SettingsAdminTemp = () => {
  return (
    <>
      <div className="background bg-cover bg-center w-full h-screen grid grid-rows-12 grid-cols-12 gap-4">
        <UserManagement colStart={"col-start-4"} colEnd={"col-end-10"} />
        <div className="row-start-10 row-end-11 col-start-8 col-end-10 flex gap-4 justify-center">
          <ButtonGroup
            textColor={"text-red-600"}
            HovertextColor={"hover:text-white"}
            toggle={false}
            color={"bg-white"}
            HoverColor={"hover:bg-red-600"}
            name={"Log Out"}
            Hovershadow={"hover:shadow-danger_shadow"}
            shadow={"shadow-danger_shadow"}
          />
        </div>
      </div>
    </>
  );
};

export default SettingsAdminTemp;
