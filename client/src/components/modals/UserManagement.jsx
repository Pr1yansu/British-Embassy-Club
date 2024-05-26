import React from "react";
import { MdModeEditOutline } from "react-icons/md";
import Roles from "../ui/Roles";
const UserManagement = ({ colStart, colEnd, allprofiledata }) => {
  return (
    <>
      <div
        className={`row-start-2 row-end-9 ${colStart} ${colEnd}   flex flex-col  p-8 bg-white shadow-member_card rounded-3xl`}
      >
        <p className="mb-6 text-lg text-text_secondary font-semibold">
          User Management
        </p>
        <div className="">
          <table className="min-w-full bg-white ">
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
              {allprofiledata &&
                allprofiledata.map((row) => (
                  <tr key={row.id}>
                    <td className="py-2 px-4 text-sm">{row.username}</td>
                    <td className="py-2 px-4 text-start text-sm ">
                      <Roles data={row.role} />
                    </td>
                    <td className="py-2 px-4 flex justify-end text-sm">
                      <a href="#" className="flex gap-2 text-text_primary">
                        <MdModeEditOutline size={20} color="primary" />
                        <p>Edit Password</p>
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
