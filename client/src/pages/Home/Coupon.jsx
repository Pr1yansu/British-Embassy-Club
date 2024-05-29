import React from "react";
import SearchBox from "../../components/ui/SearchBox";
import CouponTable from "../../components/ui/CouponTable";
// import {
//   useGetWalletQuery,
//   useAddTransactionMutation,
//   useFetchTransactionsQuery,
//   useUpdateTransactionMutation,
//   useUpdateCouponExpiresMutation,
// } from "../../store/api/walletAPI";
const Coupon = () => {
  // const { data: walletData, isLoading, isError } = useGetWalletQuery();
  // const {
  //   data: allTransactions,
  //   isSuccess,
  //   isLoading: transLoading,
  // } = useFetchTransactionsQuery();
  // const [
  //   addTransaction,
  //   {
  //     isSuccess: addTransactionSuccess,
  //     isLoading: addTransactionLoading,
  //     isError: addTransactionError,
  //   },
  // ] = useAddTransactionMutation();
  // const [updateTransaction,{
  //   isSuccess: updateTransactionSuccess,
  //   isLoading: updateTransactionLoading,
  //   isError: updateTransactionError,
  // }] = useUpdateTransactionMutation();
  // const [updateCouponExpires,
  //   {
  //     isSuccess: updateCouponExpiresSuccess,
  //     isLoading: updateCouponExpiresLoading,
  //     isError: updateCouponExpiresError,
  //   },
  // ] = useUpdateCouponExpiresMutation();

  return (
    <>
      <div className="background bg-cover bg-center w-full h-screen">
        <div className="container grid grid-rows-12 grid-cols-12 gap-4">
          <div className="row-start-2 row-end-3 col-start-3 col-end-11 ">
            <SearchBox placeholder={"Search by ID"} type={"text"} />
          </div>
          <div className="row-start-3 row-end-12 col-start-3 col-end-11">
            <CouponTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Coupon;
