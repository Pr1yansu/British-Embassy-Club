import React, { Fragment, useState } from "react";
import { MdError, MdModeEditOutline } from "react-icons/md";
import Roles from "../ui/Roles";
import { useChangeAdminOperatorPasswordMutation } from "../../store/api/clubAPI";
import ButtonGroup from "../ui/ButtonGroup";
import InputBox from "../ui/InputBox";
import toast from "react-hot-toast";
import Toasts from "../ui/Toasts";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

const UserManagement = ({ colStart, colEnd, allprofiledata, isLoading }) => {
  const [operatorId, setOperatorId] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const handleRowClick = (userId) => {
    setOperatorId(userId);
  };

  const [
    changeAdminOperatorPassword,
    { isSuccess: isPassSuccess, isLoading: isPassLoading, data },
  ] = useChangeAdminOperatorPasswordMutation();

  const handleSubmit = async () => {
    try {
    const {data} =  await changeAdminOperatorPassword({
        id: operatorId,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      }).unwrap();
      if (data) {
        toast.custom(
          <>
            <Toasts
              boldMessage={"Success!"}
              message={data.message}
              icon={
                <IoCheckmarkDoneCircleOutline
                  className="text-text_tertiaary"
                  size={32}
                />
              }
            />
          </>,
          {
            position: "top-left",
            duration: 2000,
          }
        );
        setNewPassword("");
        setConfirmPassword("");
        setOperatorId(null);
      }
    } catch (error) {
      toast.custom(
        <>
          <Toasts
            boldMessage={"Error!"}
            message={error.response.data.message || "Internal Server Error"}
            icon={<MdError className="text-text_red" size={32} />}
          />
        </>,
        {
          position: "top-left",
          duration: 2000,
        }
      );
    }
  };

  const handleCancel = () => {
    setNewPassword("");
    setConfirmPassword("");
    setOperatorId(null);
  };

  return (
    <div
      className={`row-start-2 row-end-9 ${colStart} ${colEnd} flex flex-col p-8 bg-white shadow-member_card rounded-3xl`}
    >
      <p className="mb-6 text-lg text-text_secondary font-semibold">
        User Management
      </p>
      <div className="h-72 overflow-y-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 text-start text-lg font-semibold">
                Name
              </th>
              <th className="py-2 px-4 text-lg font-semibold">Roles</th>
              <th className="py-2 px-4 flex justify-end text-lg font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
            {allprofiledata &&
              allprofiledata.data.map((row, _) => (
                <Fragment key={_}>
                  <tr
                    onClick={() => handleRowClick(row._id)}
                    className="cursor-pointer"
                  >
                    <td className="py-2 px-4 text-sm">{row.username}</td>
                    <td className="py-2 px-4 text-start text-sm">
                      <Roles data={row.role} />
                    </td>
                    <td className="py-2 px-4 flex justify-end text-sm">
                      <a href="#" className="flex gap-2 text-text_primary">
                        <MdModeEditOutline size={20} color="primary" />
                        <p>Edit Password</p>
                      </a>
                    </td>
                  </tr>
                  {operatorId === row._id && (
                    <tr>
                      <td colSpan="3" className="py-2 px-4">
                        <div className="flex flex-col gap-4">
                          <InputBox
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="border border-gray-300 p-2 rounded"
                          />
                          <InputBox
                            type="password"
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="border border-gray-300 p-2 rounded"
                          />
                          <div className="flex gap-4">
                            <ButtonGroup
                              name={isPassLoading ? "loading.." : "Submit"}
                              onClick={handleSubmit}
                              textColor={"text-btn_primary"}
                            />
                            <ButtonGroup
                              name="Cancel"
                              onClick={handleCancel}
                              color={"text-text_primary"}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
