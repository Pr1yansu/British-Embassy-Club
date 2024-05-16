import React from "react";
import { memberItem } from "../../constants";
import { FiInfo } from "react-icons/fi";
const MemberCard = () => {
  return (
    <>
      <div className="w-60 h-40 p-3 rounded-lg shadow-member_card cursor-pointer bg-white">
        {memberItem.map((item, index) => {
          return (
            <>
              <div className="flex items-center justify-between my-1">
                <img src={item.img} className="w-10" alt="member" />
                <div className="flex flex-col">
                  <p className="text-[10px]">{item.name}</p>
                  <p className="text-xs">{item.email}</p>
                </div>
                <FiInfo size={20} color="#1d4ed8" />
              </div>
              <div className="w-full h-[1px] bg-primary"></div>
              <div className="grid grid-rows-2 grid-cols-2 gap-2 my-2">
                <div className="">
                  <p className="text-xs text-text_secondary">Membership ID</p>
                  <p className="text-xs">{item.member_ID}</p>
                </div>
                <div className="ml-2">
                  <p className="text-xs text-text_secondary">Membership</p>
                  <p className="text-xs ">{item.membership}</p>
                </div>
                <div className="">
                  <p className="text-xs text-text_secondary">Mobile No.</p>
                  <p className="text-xs">{item.mobile}</p>
                </div>
                <div className="ml-2">
                  <p className="text-xs text-text_secondary">Wallet</p>
                  <p className="text-xs">{item.balance}</p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default MemberCard;
