import React from "react";
import Sidebar from "../../components/ui/Sidebar";
import SearchBox from "../../components/ui/SearchBox";
import SearchButton from "../../components/ui/SearchButton";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AnimatePresence } from "framer-motion";

const Member = () => {
  return (
    <>
      <div className="w-full h-screen grid grid-rows-12 grid-cols-12 gap-4">
        <div className="row-start-1 row-end-13 col-start-1 col-end-2">
          <AnimatePresence>
            <Sidebar />
          </AnimatePresence>
        </div>

        <div className="row-start-2 row-end-3 col-start-2 col-end-10 ">
          <SearchBox
            placeholder={
              "Search by Member Ref. number, Name, Email, Phone number......"
            }
            type={"text"}
          />
        </div>
        <div className="row-start-2 row-end-3 col-start-10 col-end-12 ">
          <SearchButton
            name={"Add Member"}
            icon={<IoMdAddCircleOutline size={22} />}
          />
        </div>
      </div>
    </>
  );
};

export default Member;
