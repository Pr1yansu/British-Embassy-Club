import React from "react";
import { BsArrowUpSquareFill } from "react-icons/bs";
import { MdAddCircle } from "react-icons/md";
import { AiFillMinusCircle } from "react-icons/ai";
import InputBox from "../ui/InputBox";
import ButtonGroup from "../ui/ButtonGroup";
import ReactDOM from "react-dom";

const OperatorReceive = () => {
  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-zinc-400/25">
        <div className="w-[712px] h-[504px] border bg-btn_secondary rounded-lg flex flex-col items-center gap-6 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <div className="bg-primary flex flex-col gap-3 justify-center w-full h-[104px] py-6 px-9 rounded-t-lg">
            <div className="flex gap-10">
              <p className="text-btn_primary roboto font-semibold">
                Member Name
              </p>
              <p className="lato">John Doe</p>
            </div>
            <div className="flex gap-[73px]">
              <p className="text-btn_primary roboto font-semibold">Member ID</p>
              <p className="lato">BEC20240201DEMO1</p>
            </div>
          </div>
          {/* Upper part ends here */}

          {/* Lower part starts here */}
          <form className="flex flex-col gap-4 w-full px-9">
            {/* 1st row starts here */}
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-3">
                <p className="text-btn_primary roboto font-medium">
                  Enter Receivable amount :
                </p>
                <div className="flex justify-stretch items-center gap-2 w-64">
                  <div className="cursor-pointer">
                    <MdAddCircle size={40} color="#3B82F6" />
                  </div>
                  <InputBox type={"text"} placeholder={"0"} />
                  <div className="cursor-pointer">
                    <AiFillMinusCircle size={40} color="#3B82F6" />
                  </div>
                  <div className="cursor-pointer">
                    <BsArrowUpSquareFill size={30} color="#1D4ED8" />
                  </div>
                </div>
              </div>
              <div className="w-52">
                <label
                  htmlFor=""
                  className="flex flex-col items-end gap-3 text-btn_primary roboto font-medium"
                >
                  Current Wallet Balance
                  <div className="w-28">
                    <div className="bg-primary outline-none flex items-center justify-center h-6 py-5 px-4 rounded-lg text-lg text-text_primary">
                      1200
                    </div>
                  </div>
                </label>
              </div>
            </div>
            {/* 1st row ends here */}

            {/* 2nd row starts here */}
            <div className="w-56 flex flex-col items-center gap-2 self-center mt-12 mb-20">
              <p className="text-btn_primary roboto font-medium text-center">
                {" "}
                Updated Wallet Balance
              </p>
              <div className="w-32">
                <div className="bg-primary outline-none flex items-center justify-center h-6 py-5 px-4 rounded-lg text-lg text-text_primary">
                  1200
                </div>
              </div>
            </div>
            {/* 2nd row ends here */}

            {/* 3rd row starts here */}
            <div className="flex justify-end w-full gap-6">
              <ButtonGroup
                name={"Cancel"}
                color={"bg-[#F8FAFC]"}
                textColor={"text-[#1D4ED8]"}
              />
              <ButtonGroup
                name={"Confirm"}
                color={"bg-[#F8FAFC]"}
                textColor={"text-[#6B7280]"}
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

export default OperatorReceive;
