import React from "react";
import Sidebar from "../../components/ui/Sidebar";
import ChangePassword from "../../components/form/ChangePassword";
import UserManagement from "../../components/modals/UserManagement";
const SettingsAdmin = () => {
  return (
    <>
      <div className="background bg-cover bg-center w-full h-screen grid grid-rows-12 grid-cols-12 gap-4">
        <Sidebar />
        <ChangePassword colStart={"col-start-3"} colEnd={"col-end-7"}/>
        <UserManagement colStart={"col-start-7"} colEnd={"col-end-11"}/>
      </div>
    </>
  );
};

export default SettingsAdmin;
