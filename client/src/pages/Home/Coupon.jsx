import React, { useState, useEffect } from "react";
import SearchBox from "../../components/ui/SearchBox";
import CouponTable from "../../components/ui/CouponTable";
import {
  useGetWalletQuery,
  useAddTransactionMutation,
  useFetchTransactionsQuery,
  useUpdateTransactionMutation,
  useUpdateCouponExpiresMutation,
} from "../../store/api/walletAPI";
import axios from "axios";
import Toasts from "../../components/ui/Toasts";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { MdError } from "react-icons/md";
import OperatorQuery from "../../components/modals/Operator-query";
import { useGetOperatorProfileQuery } from "../../store/api/operatorAPI";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/ui/loader";
const Coupon = () => {
  const navigate = useNavigate();
  const [openQuery, setopenQuery] = useState(false);
  const [search, setSearch] = useState();
  const [walletdata, setWalletData] = useState(0);
  const {
    data: profileData,
    isLoading: profileLoading,
  } = useGetOperatorProfileQuery();

  if (profileLoading) return <Loader />;

  if (!profileData) navigate("/login/operator");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/wallet/get/${search}`,
        {
          withCredentials: true,
        }
      );
      if (data) {
        setWalletData(data.data);
        setopenQuery(true);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.custom(
          <Toasts
            boldMessage={"Error!"}
            message={error.response.data.message}
            icon={<MdError className="text-red-600" size={32} />}
          />,
          {
            position: "top-right",
            duration: 2000,
          }
        );
      } else {
        toast.custom(
          <Toasts
            boldMessage={"Error!"}
            message={"An unexpected error occurred. Please try again later."}
            icon={<MdError className="text-red-600" size={32} />}
          />,
          {
            position: "top-right",
            duration: 2000,
          }
        );
      }
    }
  };

  return (
    <>
      <div className="background bg-cover bg-center w-full h-screen">
        <div className="container grid grid-rows-12 grid-cols-12 gap-4 mx-auto">
          <div className="row-start-2 row-end-3 col-start-3 col-end-11 ">
            <SearchBox
              placeholder={"Search by ID"}
              type={"text"}
              onchange={(e) => setSearch(e.target.value)}
              onClick={handleSearch}
            />
          </div>
          <div className="row-start-3 row-end-12 col-start-3 col-end-11">
            <CouponTable walletdata={walletdata} reloadQuery={openQuery} />
          </div>
        </div>
      </div>
      {openQuery && (
        <OperatorQuery
          walletdata={walletdata}
          setWalletData={setWalletData}
          setopenQuery={setopenQuery}
          onOpen={() => setopenQuery(false)}
        />
      )}
    </>
  );
};

export default Coupon;
