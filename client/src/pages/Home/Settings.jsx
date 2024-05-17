import React from "react";
import Sidebar from "../../components/ui/Sidebar";
import ChangePassword from "../../components/form/ChangePassword";
const Settings = () => {
  return (
    <>
      <div className="background bg-cover bg-center w-full h-screen grid grid-rows-12 grid-cols-12 gap-4">
        <Sidebar />
        <ChangePassword colStart={"col-start-5"} colEnd={"col-end-9"} />
        <div className="row-start-11 row-end-12 col-start-8 col-end-12"></div>
      </div>
    </>
  );
};

export default Settings;
