import React from "react";
import Sidebar from "../../components/ui/Sidebar";
import SettingForm from "../../components/form/SettingForm";
const Settings = () => {
  return (
    <>
      <div className="background bg-cover bg-center w-full h-screen grid grid-rows-12 grid-cols-12 ">
        <Sidebar />
        <SettingForm/>
      </div>
    </>
  );
};

export default Settings;
