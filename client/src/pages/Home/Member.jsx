import React, { useState } from "react";
import Sidebar from "../../components/ui/Sidebar";
import SearchBox from "../../components/ui/SearchBox";
import AddButton from "../../components/ui/AddButton";
import { IoMdAddCircleOutline } from "react-icons/io";
import AddMember from "../../components/modals/Add-member";
import MemberCard from "../../components/ui/MemberCard";
import { ListItem } from "@mui/material";
import { memberItem } from "../../constants/index";

const Member = () => {
  const [open, SetOpen] = useState(false);

  return (
    <>
      <div className="background bg-cover bg-center w-full h-screen grid grid-rows-12 grid-cols-12 gap-4">
        <Sidebar />
        <div className="row-start-2 row-end-3 col-start-2 col-end-10 ">
          <SearchBox
            placeholder={
              "Search by Member Ref. number, Name, Email, Phone number......"
            }
            type={"text"}
          />
        </div>
        <div
          className="row-start-2 row-end-3 col-start-10 col-end-12 "
          onClick={() => SetOpen(true)}
        >
          <AddButton
            name={"Add Member"}
            icon={<IoMdAddCircleOutline size={22} />}
          />
        </div>
        <div className="row-start-3 row-end-11 col-start-2 col-end-12">
          <MemberCard />
        </div>   
      </div>
      {open && <AddMember onModal={() => SetOpen(false)} />}
    </>
  );
};

export default Member;
