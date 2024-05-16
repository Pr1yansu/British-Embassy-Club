import React from "react";
import ReactDom from 'react-dom'
import { IoExitOutline } from "react-icons/io5";
import ButtonGroup from "../ui/ButtonGroup";

const OperatorQuery = () => {
  return ReactDom.createPortal(
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.7)]">
      <section className="w-[712px] h-[418px] border bg-btn_secondary rounded-lg flex flex-col items-center gap-6 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        {/* Upper div starts here */}
        <div className="bg-primary flex flex-col gap-3 justify-center w-full h-[104px] py-6 px-9 rounded-t-lg">
            <div className="flex gap-10">
              <p className="text-btn_primary roboto font-semibold">Member Name</p>
              <p className="lato">John Doe</p>
            </div>
            <div className="flex gap-[73px]">
              <p className="text-btn_primary roboto font-semibold">Member ID</p>
              <p className="lato">BEC20240201DEMO1</p>
            </div>
          </div>
        {/* Upper div ends hete */}

        {/* Lower div starts here */}
        <div className="flex flex-col gap-9 px-16 items-center">
          {/* Heading starts */}
          <div>
            <p className="text-3xl font-roboto text-btn_primary font-semibold">What do you want ?</p>
          </div>
          {/* Heading ends */}

          {/* Buttons starts */}
          <div className="flex gap-24">
            <div className="bg-primary w-60 flex flex-col items-center gap-3 p-2 rounded-xl cursor-pointer">
              <p className="text-2xl font-roboto font-medium text-btn_primary">Issue Coupon</p>
              <div><IoExitOutline size={50} color="#1D4ED8"/></div>
            </div>
            <div className="bg-primary w-60 flex flex-col items-center gap-3 p-2 rounded-xl cursor-pointer">
              <p className="text-2xl font-roboto font-medium text-btn_primary">Receive Coupon</p>
              <div className="-rotate-180"><IoExitOutline size={50} color="#1D4ED8"/></div>
            </div>
          </div>
          {/* Buttons ends */}

          {/* Cancel button starts */}
          <div>
            <ButtonGroup color={'bg-btn_secondary' } textColor={"text-text_primary"} name={'Cancel'}/>
          </div>
          {/* Cancel button ends */}

        </div>
        {/* Lower div ends here */}
      </section>
    </div>,
    document.getElementById("portal")
  );
};

export default OperatorQuery;
