import React from "react";
import ButtonGroup from "../ui/ButtonGroup";
import ReactDOM from "react-dom";
import { useDeleteMemberMutation } from "../../store/api/memberAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Toasts from "../ui/Toasts";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdError } from "react-icons/md";

const MemberTrDetails = ({ onModal, memberId }) => {
  const navigate = useNavigate();
 

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.7)] z-20">
        <div className="w-150 h-60 border bg-btn_secondary rounded-lg flex flex-col items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <div className="bg-primary flex flex-col items-center justify-center w-full h-16 p-2 rounded-t-lg">
            <div className="flex gap-10">
              <p className="text-btn_primary roboto font-medium !text-sm">
                Member Name
              </p>
              <p className="lato !text-sm">sdns</p>
            </div>
            <div className="flex gap-[73px] mr-1">
              <p className="text-btn_primary roboto font-medium !text-sm">
                Member ID
              </p>
              <p className="lato !text-sm">as</p>
            </div>
          </div>
          {/* Upper part ends here */}

          {/* Lower part starts here */}

          {/* 1st row starts here */}
          <div className="flex justify-between">
            <div className="flex justify-between items-center gap-2 w-full">
              <p className="text-base roboto">Total Transactions Today:</p>
              <p className="text-base roboto font-bold">7646</p>
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              <p className="text-base roboto">Total Transactions Today:</p>
              <p className="text-base roboto font-bold">76968</p>
            </div>
          </div>
          {/* 1st row ends here */}

          {/* 2nd row starts here*/}
          <div className="w-full flex justify-between">
            <div className="flex justify-between items-center gap-2 w-full">
              <p className="text-base roboto">Total Transactions Today:</p>
              <p className="text-base roboto font-bold">7646</p>
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              <p className="text-base roboto">Total Transactions Today:</p>
              <p className="text-base roboto font-bold">76968</p>
            </div>
          </div>
          {/* 2nd row ends here */}

          {/* 3rd row starts here */}
          <div className="flex justify-center gap-6 mt-3">
            <div className="flex justify-between items-center gap-2 w-full">
              <p className="text-base roboto">Total Transactions Today:</p>
              <p className="text-base roboto font-bold">7646</p>
            </div>
          </div>
          {/* 3rd row ends here */}

          {/* Lower part ends here */}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default MemberTrDetails;
