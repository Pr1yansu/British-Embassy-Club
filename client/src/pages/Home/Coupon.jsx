import React from "react";
import SearchBox from "../../components/ui/SearchBox";
import CouponTable from "../../components/ui/CouponTable";
const Coupon = () => {
  return (
    <>
    <div className="background bg-cover bg-center w-full h-screen">
      <div className="container grid grid-rows-12 grid-cols-12 gap-4">
        <div className="row-start-2 row-end-3 col-start-3 col-end-11 ">
          <SearchBox placeholder={"Search by ID"} type={"text"} />
        </div>
        <div className="row-start-4 row-end-12 col-start-3 col-end-11">
          <CouponTable />
        </div>
      </div>
    </div>
    </>
  );
};

export default Coupon;
