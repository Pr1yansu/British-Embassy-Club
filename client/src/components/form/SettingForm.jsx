import React, { useState } from "react";
import Passwordbox from "../ui/Passwordbox";
import Button from "../ui/Button";

const SettingForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOldPasswordChange = (e) => setOldPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement password change logic here
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
    } else {
      alert("Password changed successfully");
      // Perform the password change operation (API call, etc.)
    }
  };
  const handleCancel = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <div className="row-start-2 row-end-9 col-start-5 col-end-9 flex flex-col justify-center p-8 bg-white shadow-member_card rounded-3xl">
        <p className="mb-6 text-lg text-text_secondary font-semibold">
          Change Password
        </p>
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
          <div className="mb-4">
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
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg"
            >
              Cancel
            </button>
            <Button name={"Confirm"} type={"submit"} />
          </div>
        </form>
      </div>
    </>
  );
};

export default SettingForm;
