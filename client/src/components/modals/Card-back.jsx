import React from "react";
import VirtualCardStyle from "../../style/virtualCard.module.css";

function BackView() {
  return (
    <div className={VirtualCardStyle.card}>
      <div className="container">
        <p className={VirtualCardStyle.cardHeader}>British Club Kolkata</p>
      </div>
      <div className="container flex justify-between flex-row-reverse">
        <img className={VirtualCardStyle.cardImage} src={qrLink} alt="error" />
      </div>
    </div>
  );
}

export default BackView;

const qrLink =
  "https://qr.rebrandly.com/v1/qrcode?shortUrl=https%3A%2F%2Frebrand.ly%2Fv574wuj&source=com.rebrandly.app&size=128&dummy=0.8802666156629211&logo=rebrandly";
