import React from "react";
import VirtualCardStyle from "../../style/virtualCard.module.css";
import { CgProfile } from "react-icons/cg";

function FrontView({ data, image }) {
  console.log(image);
  const date_time =
    data.expiryTime.split("T")[0] +
    " " +
    data.expiryTime.split("T")[1].split(".")[0];
  return (
    <div className={VirtualCardStyle.card}>
      {/* card top section */}
      <div className="container flex justify-between pb-2 border-b border-black">
        <div className=" flex flex-col gap-2 justify-center ">
          <div className="flex gap-2">
            <h4 className="font-semibold text-sm">Name:</h4>
            <p className="text-sm text-start">
              {data.firstname + " " + data.lastname
                ? data.firstname + " " + data.lastname
                : "N/A"}
            </p>
          </div>
          <div className="flex gap-2">
            <h4 className="font-semibold text-sm text-start">Member Id:</h4>
            <p className="text-sm text-start">{data._id ? data._id : "N/A"}</p>
          </div>
        </div>
        {image ? (
                <img
                  src={image}
                  alt="member"
                  className="w-20 h-20 aspect-auto rounded-full object-cover object-center"
                />
              ) : (
                <CgProfile
                  className="w-20 h-20 aspect-auto rounded-full object-cover object-center"
                  color="#6B7280"
                />
              )}
      </div>
      {/* card bottom section */}
      <div className=" flex flex-col py-2 gap-2 justify-center ">
        <div className="flex gap-2">
          <h4 className="font-semibold text-sm">Mobile No.:</h4>
          <p className="text-sm text-start">
            {data.mobileNumber ? data.mobileNumber : "N/A"}
          </p>
        </div>
        <div className="flex gap-2">
          <h4 className="font-semibold text-sm">Blood Group:</h4>
          <p className="text-sm text-start">
            {data.bloodGroup ? data.bloodGroup : "N/A"}
          </p>
        </div>
        <div className="flex gap-2">
          <h4 className="font-semibold text-sm">Expired On:</h4>
          <p className="text-sm text-start">{date_time ? date_time : "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

export default FrontView;