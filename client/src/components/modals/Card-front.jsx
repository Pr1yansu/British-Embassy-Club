import React from "react";
import VirtualCardStyle from "../../style/virtualCard.module.css";

function FrontView() {
  return (
    <div className={VirtualCardStyle.card}>
      <div className="container flex justify-between flex-row-reverse">
        <img
          className={VirtualCardStyle.cardImage}
          src={imageLink}
          alt="error"
        />
      </div>
      <div className="container">
        <p className={VirtualCardStyle.cardFooter}>Customer Name</p>
        <p className={VirtualCardStyle.cardFooter}>BEC20240513SUNIT811</p>
      </div>
    </div>
  );
}

export default FrontView;

const imageLink =
  "https://media.licdn.com/dms/image/D5603AQF5mBog59pi3w/profile-displayphoto-shrink_800_800/0/1705859216473?e=2147483647&v=beta&t=uSeEasAnkso9M5MYjrfA9W8EWSSnwNYXbjlCJHVnfCA";
