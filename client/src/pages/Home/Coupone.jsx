import React from "react";
import Sidebar from "../../components/ui/Sidebar";
import SearchBox from "../../components/ui/SearchBox";
import DataTable from "../../components/ui/CouponeTable";
const Coupone = () => {
  return (
    <>
      <div className="background bg-cover bg-center w-full h-screen grid grid-rows-12 grid-cols-12 gap-4">
        <Sidebar />
        <div className="row-start-2 row-end-3 col-start-3 col-end-11 ">
          <SearchBox placeholder={"Search by ID"} type={"text"} />
        </div>
        <div className="row-start-4 row-end-12 col-start-3 col-end-11">
          {DataTable()}
        </div>
      </div>
    </>
  );
};

export default Coupone;
