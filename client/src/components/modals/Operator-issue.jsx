import { BsArrowUpSquareFill } from "react-icons/bs";
import InputBox from "../ui/InputBox";
import ButtonGroup from "../ui/ButtonGroup";
import React from "react";
import ReactDOM from "react-dom";

const OperatorIssue = ({onModal}) => {
  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.7)] z-20">
        <div className="w-[712px] h-[504px] border bg-btn_secondary rounded-lg flex flex-col items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <div className="bg-primary flex flex-col gap-3 justify-center w-full h-[104px] py-6 px-9 rounded-t-lg">
            <div className="flex gap-10">
              <p className="text-btn_primary roboto font-medium">Member Name</p>
              <p className="lato">John Doe</p>
            </div>
            <div className="flex gap-[73px]">
              <p className="text-btn_primary roboto font-medium">Member ID</p>
              <p className="lato">BEC20240201DEMO1</p>
            </div>
          </div>
          {/* Upper part ends here */}

          {/* Lower part starts here */}
          <form className="flex flex-col gap-6 w-full px-9 py-6">
            {/* 1st row starts here */}
            <div className="flex justify-between">
              <div className="flex flex-col gap-6 w-52">
                <p className="text-btn_primary roboto font-medium">
                  Issue Type:
                </p>
                <label htmlFor="" className="flex flex-col gap-2 lato">
                  Payment amount only
                  <InputBox type={"text"} placeholder={"Enter Amount"} />
                </label>
              </div>
              <div className="w-52">
                <label
                  htmlFor=""
                  className="flex flex-col justify-start gap-2 text-btn_primary roboto font-medium"
                >
                  Current Wallet Balance
                  <div className="bg-primary outline-none flex items-center justify-center h-6 py-5 px-4 rounded-lg text-lg text-text_primary">
                    1200
                  </div>
                </label>
              </div>
            </div>
            {/* 1st row ends here */}

            {/* 2nd row starts here*/}
            <div className="w-96 flex flex-col items-start gap-2">
              <p className="lato">Payment amount with Wallet amount</p>
              <div className="flex gap-6 items-center">
                <InputBox placeholder={"Payment Amount"} type={"text"} />
                <InputBox placeholder={"Wallet Amount"} type={"text"} />
                <div className="cursor-pointer">
                  <BsArrowUpSquareFill size={30} color="#1D4ED8" />
                </div>
              </div>
            </div>
            {/* 2nd row ends here */}

            {/* 3rd row starts here */}
            <div className="flex justify-between w-full">
              <div className="w-full flex flex-col gap-2">
                <p className="lato"> Wallet amount only</p>
                <div className="flex gap-6 items-center justify-between">
                  <div className="flex gap-6 items-center w-56">
                  <InputBox placeholder={"Enter Amount"} type={"text"} />
                  <div className="cursor-pointer">
                    <BsArrowUpSquareFill size={30} color="#1D4ED8" />
                  </div>
                  </div>
                  <div className="flex justify-end gap-6">
                    <ButtonGroup
                      name={"Confirm"}
                      color={"bg-btn_secondary"}
                      textColor={"text-btn_primary"}
                    />
                    <ButtonGroup
                      name={"Cancel"}
                      color={"bg-btn_secondary"}
                      textColor={"text-text_primary"}
                      onClick={()=>onModal()}
                    />
                  </div>
                </div>
              </div>
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
