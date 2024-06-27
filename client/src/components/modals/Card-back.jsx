import React from "react";
import VirtualCardStyle from "../../style/virtualCard.module.css";

function BackView({ Qrcode, backendRef }) {
  return (
    <div className={VirtualCardStyle.card} ref={backendRef}>
      <div className="container">
        <p className={VirtualCardStyle.cardHeader}>British Club Kolkata</p>
      </div>
      <div className="container flex justify-between flex-row-reverse">
        <img className={VirtualCardStyle.cardImage} src={Qrcode} alt="error" />
      </div>
    </div>
  );
}

export default BackView;
