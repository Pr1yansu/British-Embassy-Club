import React, { useState, useEffect } from "react";
import InputBox from "../ui/InputBox";
import ButtonGroup from "../ui/ButtonGroup";
import ReactDOM from "react-dom";
import { useAddTransactionMutation } from "../../store/api/walletAPI";
import Toasts from "../ui/Toasts";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";
import { LuLoader2 } from "react-icons/lu";
import { BsArrowUpSquareFill } from "react-icons/bs";

const OperatorIssue = ({ onModal, walletdata, setopenQuery }) => {
  const [Method, setMethod] = useState("");
  const [openExtend, setOpenExtend] = useState(false);
  const navigate = useNavigate();
  const [couponAmount, setCouponAmount] = useState();
  const [payableAmount, setPayableAmount] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [disable, setDisable] = useState(true);

  const [
    addTransaction,
    {
      isSuccess: addTransactionSuccess,
      isLoading: addTransactionLoading,
      isError: addTransactionError,
    },
  ] = useAddTransactionMutation();

  useEffect(() => {
    walletdata && setWalletBalance(walletdata.wallet.balance);
  }, []);

  useEffect(() => {
    getPaybleAmountAndRemainingAmount(couponAmount);
  }, [couponAmount]);

  const handleCouponAmountChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setCouponAmount(0); // Set to 0 if input is empty
    } else {
      const parsedValue = parseInt(value, 10);
      if (!isNaN(parsedValue)) {
        setCouponAmount(parsedValue);
      }
    }
    // getPaybleAmountAndRemainingAmount(0);
  };

  const getPaybleAmountAndRemainingAmount = (parsedValue) => {
    let coupon = couponAmount === "" ? 0 : couponAmount;
    let wallet =
      walletdata.wallet.balance === "" ? 0 : walletdata.wallet.balance;
    let remainingAmount = wallet - coupon;
    if (remainingAmount < 0) {
      setPayableAmount(coupon - wallet);
      setDisable(false);
      wallet = 0;
    } else {
      setDisable(true);
      setPayableAmount(0);
      setMethod("");
      wallet = remainingAmount;
    }
    if (isNaN(wallet))
      wallet = walletdata.wallet.balance === "" ? 0 : walletdata.wallet.balance;

    setWalletBalance(wallet);
  };

  const handleConfirm = async () => {
    try {
      const { data } = await addTransaction({
        memberId: walletdata && walletdata.wallet.memberId._id,
        type: "issue",
        payableAmount: payableAmount,
        couponAmount: couponAmount,
      });
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
            position: "top-right",
            duration: 2000,
          }
        );
        onModal();
        setopenQuery(false);
        navigate("/coupon");
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
          position: "top-right",
          duration: 2000,
        }
      );
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.7)] z-20">
        <div className="w-[712px] h-[427px] border bg-btn_secondary rounded-lg flex flex-col items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <div className="bg-primary flex flex-col gap-3 justify-center w-full h-[104px] py-6 px-9 rounded-t-lg">
            <div className="flex gap-10">
              <p className="text-btn_primary roboto font-medium">Member Name</p>
              <p className="lato">
                {walletdata && walletdata.wallet.memberId.firstname}{" "}
                {walletdata && walletdata.wallet.memberId.lastname}
              </p>
            </div>
            <div className="flex gap-[73px]">
              <p className="text-btn_primary roboto font-medium">Member ID</p>
              <p className="lato">
                {walletdata && walletdata.wallet.memberId._id}
              </p>
            </div>
          </div>
          {/* Upper part ends here */}

          {/* Lower part starts here */}
          <form
            className="flex flex-col gap-6 w-full px-9 py-6"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* 1st row starts here */}
            <div className="flex justify-between">
              <div className="flex flex-col gap-6 w-52">
                <label
                  htmlFor=""
                  className="flex flex-col justify-start gap-2 text-btn_primary roboto font-medium"
                >
                  Enter Debit amount :
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    value={couponAmount}
                    onChange={handleCouponAmountChange}
                    className="bg-primary outline-none flex items-center justify-center h-12 py-5 px-4 rounded-lg text-lg text-text_primary"
                  />
                </label>
              </div>
              <div className="w-52">
                <label
                  htmlFor=""
                  className="flex flex-col justify-start gap-2 text-btn_primary roboto font-medium"
                >
                  Current Wallet Balance
                  <div className="bg-primary outline-none flex items-center justify-center h-12 py-5 px-4 rounded-lg text-lg text-text_primary">
                    {/* {walletdata && walletdata.wallet.balance} */}
                    {walletBalance}
                  </div>
                </label>
              </div>
            </div>
            {/* 1st row ends here */}

            {/* 2nd row starts here*/}
            <div className="w-full flex justify-between">
              <div>
                <label
                  className={
                    `flex flex-col items-start relative text-btn_primary roboto font-medium w-56 gap-2 ${disable && "text-text_primary"}`
                  }
                >
                  Select Payment Method
                  <div className={`flex items-center w-52 gap-1 h-12 bg-primary pr-2  ${openExtend ? 'rounded-t-lg':'rounded-lg'}`}>
                    <InputBox
                      type="text"
                      onChange={(e) => setMethod(e.target.value)}
                      value={Method}
                      placeholder="Select Method"
                      disabled = {disable}
                    />
                    <BsArrowUpSquareFill
                      size={30}
                      onClick={() => {
                        !disable && setOpenExtend(!openExtend);
                      }}
                      className={`${!openExtend &&
                        "transform rotate-180"} ease-in-out duration-300 cursor-pointer`}
                    />
                  </div>
                  {openExtend && (
                    <div className="bg-primary outline-none rounded-b-lg text-text_primary absolute top-20 border-t-2 border-btn_primary text-sm w-52">
                      <ul className="flex flex-col items-center cursor-pointer">
                        <li
                          onClick={() => {
                            setMethod("CASH");
                            setOpenExtend(false);
                          }}
                          className="hover:bg-btn_secondary hover:text-btn_primary w-full pt-2.5 pb-1 px-4"
                        >
                          CASH
                        </li>
                        <li
                          onClick={() => {
                            setMethod("CARD");
                            setOpenExtend(false);
                          }}
                          className="hover:bg-btn_secondary hover:text-btn_primary w-full py-1 px-4"
                        >
                          CARD
                        </li>
                        <li
                          onClick={() => {
                            setMethod("UPI");
                            setOpenExtend(false);
                          }}
                          className="hover:bg-btn_secondary hover:text-btn_primary w-full  py-1 px-4"
                        >
                          UPI
                        </li>
                      </ul>
                    </div>
                  )}
                </label>
              </div>
              <div className="flex justify-center w-52">
                <label
                  htmlFor=""
                  className="flex flex-col justify-start gap-2 text-btn_primary roboto font-medium"
                >
                  Payable Amount
                  <div className="bg-primary outline-none flex items-center w-52 justify-center h-12 py-5 px-4 rounded-lg text-lg text-text_primary">
                    {payableAmount}
                  </div>
                </label>
              </div>
            </div>
            {/* 2nd row ends here */}

            {/* 3rd row starts here */}
            <div className="flex justify-end gap-6 mt-3">
              <ButtonGroup
                name={
                  addTransactionLoading ? (
                    <>
                      <LuLoader2 className="animate-spin" size={20} />
                    </>
                  ) : (
                    <>Confirm</>
                  )
                }
                color={"bg-btn_secondary"}
                textColor={"text-btn_primary"}
                onClick={handleConfirm}
                disabled={addTransactionLoading}
              />
              <ButtonGroup
                name={"Cancel"}
                color={"bg-btn_secondary"}
                textColor={"text-text_primary"}
                onClick={() => onModal()}
              />
            </div>
            {/* 3rd row ends here */}
          </form>
          {/* Lower part ends here */}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default OperatorIssue;
