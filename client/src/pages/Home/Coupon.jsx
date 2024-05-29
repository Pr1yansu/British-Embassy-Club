import React, { useState, useEffect } from "react";
import SearchBox from "../../components/ui/SearchBox";
import CouponTable from "../../components/ui/CouponTable";
import OperatorQuery from "../../components/modals/Operator-query";
import { useGetAllMembersQuery } from "../../store/api/memberAPI";

const Coupon = () => {
  const [openQuery, setOpenQuery] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const {
    data: couponSearch,
    isSuccess: couponSearchSuccess,
    isLoading: couponSearchLoading,
  } = useGetAllMembersQuery({ search: searchInput });

  if (couponSearchLoading) return <div>Loading........</div>;

  if (couponSearch){
    console.log("From coupon ", couponSearch);
  }
    return (
      <>
        <div className="background bg-cover bg-center w-full h-screen">
          <div className="container grid grid-rows-12 grid-cols-12 gap-4">
            <div className="row-start-2 row-end-3 col-start-3 col-end-11 ">
              <SearchBox
                placeholder={"Search by ID"}
                type={"text"}
                onClick={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div className="row-start-4 row-end-12 col-start-3 col-end-11">
              <CouponTable
                data={couponSearch}
                loading={couponSearchLoading}
                success={couponSearchSuccess}
              />
            </div>
          </div>
        </div>
        {openQuery && <OperatorQuery onOpen={() => setOpenQuery(false)} />}
      </>
    );
};

export default Coupon;
