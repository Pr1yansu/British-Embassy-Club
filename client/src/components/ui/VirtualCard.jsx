import React, { useState } from "react";
import axios from "axios";
import VirtualCardStyle from "../../style/virtualCard.module.css";
import FrontView from "../modals/Card-front";
import BackView from "../modals/Card-back";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";
import { BsFiletypePdf } from "react-icons/bs";
import { TbMailShare } from "react-icons/tb";

function VirtualCard({ onModal, data, image }) {
  const [open, setOpen] = useState(true);

  const sendCardAsEmail = async () => {
    const input = document.getElementById("virtual-card");
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    try {
      if (!data.email) {
        return toast.error("Please provide an email address.");
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/member/send-card-email`,
        {
          image: imgData,
          email: data.email,
        }
      );

      if (response.status === 200) {
        alert("Email sent successfully!");
      } else {
        alert("Failed to send email.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send email.");
    }
  };

  const downloadAsPdf = async () => {
    const input = document.getElementById("virtual-card");
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/member/download-card-pdf`,
        {
          image: imgData,
        }
      );

      if (response.status === 200) {
        alert("Pdf downloaded successfully!");
      } else {
        alert("Failed to download pdf.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to download pdf.");
    }
  };

  return (
    <>
      {open && (
        <div
          className="fixed h-screen w-screen top-0 left-0 right-0 bottom-0 bg-black/50 z-20 flex items-center justify-center"
          onClick={() => {
            onModal();
            setOpen(false);
          }}
        >
          <div
            onClick={(val) => val.stopPropagation()}
            className="hover:cursor-pointer"
          >
            <div id="virtual-card" className={VirtualCardStyle.flipCard}>
              <div className={VirtualCardStyle.flipCardInner}>
                <div className={VirtualCardStyle.flipCardFront}>
                  <FrontView data={data} image={image} />
                </div>
                <div className={VirtualCardStyle.flipCardBack}>
                  <BackView />
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <button
                onClick={sendCardAsEmail}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                <TbMailShare />
              </button>
              <button
                onClick={downloadAsPdf}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                <BsFiletypePdf />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VirtualCard;
