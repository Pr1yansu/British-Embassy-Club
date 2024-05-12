import React from "react";
import ButtonGroup from "../ui/ButtonGroup";
import ReactDOM from "react-dom";

const Warning = ({ onModal }) => {
  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.7)]">
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[470px] h-[328px] bg-[#F8FAFC] p-6 flex flex-col justify-between rounded-3xl">
          <div className="w-full flex flex-col gap-3 items-center">
            <h1 className="text-red-600">warining !</h1>
            <p className="text-center text- font-semibold">
              Are you sure you want to remove all the data <br /> of the member
              from your database ?
            </p>
            <p className="text-base text-text_primary font-medium">
              Deleted data cannot be retrived later.
            </p>
          </div>
          <div className="flex justify-between items-center">
            <ButtonGroup
              name={"Cancel"}
              color={"bg-[#F8FAFC]"}
              textColor={"text-[#6B7280]"}
              onClick={() => {
                onModal();
              }}
            />
            <ButtonGroup
              name={"Submit"}
              color={"bg-blue-700"}
              textColor={"text-white"}
            />
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Warning;
