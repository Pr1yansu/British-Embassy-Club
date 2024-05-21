import React, { useState } from "react";
import Passwordbox from "../ui/Passwordbox";
import ButtonGroup from "../ui/ButtonGroup";

const ChangePassword = ({ colStart, colEnd }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOldPasswordChange = (e) => setOldPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
    } else {
      alert("Password changed successfully");
    }
  };
  const handleCancel = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <div
        className={`row-start-2 row-end-9 ${colStart} ${colEnd}   flex flex-col justify-center p-8 bg-white shadow-member_card rounded-3xl`}
      >
        <div className="flex justify-between items-center mb-6">
          <p className=" text-lg text-text_secondary font-semibold">
            Change Password
          </p>
          <p className="text-text_secondary text-xs underline cursor-pointer">
            Password Policy*
          </p>
        </div>

        <form className="" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="oldPassword"
              className="block text-text_primary mb-1 text-sm"
            >
              Old Password
            </label>
            <Passwordbox
              placeholder={"Password"}
              value={oldPassword}
              id={"oldPassword"}
              onchange={handleOldPasswordChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="newPassword"
              className="block text-text_primary mb-1 text-sm"
            >
              New Password
            </label>
            <Passwordbox
              placeholder={"Password"}
              value={newPassword}
              id={"newPassword"}
              onchange={handleNewPasswordChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-text_primary mb-1 text-sm"
            >
              Confirm Password
            </label>
            <Passwordbox
              placeholder={"Password"}
              value={confirmPassword}
              id={"confirmPassword"}
              onchange={handleConfirmPasswordChange}
            />
          </div>
          <div className="flex justify-end gap-4">
          <ButtonGroup name={"Cancel"} textColor={"text-text_secondary"} color={'bg-btn_secondary'}/>
            <ButtonGroup name={"Confirm"} textColor={"text-text_secondary"} />
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
