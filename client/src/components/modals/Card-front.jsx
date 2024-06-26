import React from "react";
import VirtualCardStyle from "../../style/virtualCard.module.css";
import profile from "../../assets/images/profilePic.png";

function FrontView({ data, image }) {
  return (
    <div className={VirtualCardStyle.card}>
      <div className="container flex justify-between flex-row-reverse">
        <img
          className="w-20 h-20 aspect-auto rounded-full object-cover object-center"
          src={image ? image : profile}
          alt="error"
        />
      </div>
      <div className="container flex justify-between">
        <div>
          <h4 className="font-semibold text-sm">Customer Name</h4>
          <p className="text-sm text-start">{data.name ? data.name : "N/A"}</p>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-start">MemberId</h4>
          <p className="text-sm">{data._id ? data._id : "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

export default FrontView;
