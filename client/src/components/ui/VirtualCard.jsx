import React, { useRef, useState } from "react";
import axios from "axios";
import VirtualCardStyle from "../../style/virtualCard.module.css";
import FrontView from "../modals/Card-front";
import BackView from "../modals/Card-back";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";
import { BsFiletypePdf } from "react-icons/bs";
import { TbMailShare } from "react-icons/tb";
import { useGetMemberByIdQuery } from "../../store/api/memberAPI";
import Loader from "./loader";

function VirtualCard({ onModal, data }) {
  const [open, setOpen] = useState(true);
  const frontendRef = useRef();
  const backendRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  console.log(data._id);
    const {
      data: virtualData,
      isLoading: virtualCardLoading,
      refetch,
    } = useGetMemberByIdQuery({
      memberId: data._id,
    });

  if (virtualCardLoading) return <Loader />;

  console.log(virtualData);

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
  setIsLoading(true);
  try {
    const frontcanvas = await html2canvas(frontendRef.current);
    const backcanvas = await html2canvas(backendRef.current);

    // Convert canvas elements to image data URLs
    const frontimage = frontcanvas.toDataURL("image/png");
    const backimage = backcanvas.toDataURL("image/png");

    // Send image data URLs to the server
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/member/download-card-pdf`,
      {
        frontimage,
        backimage,
      }
    );

    if (response.status === 200) {
      // Create a blob from the response data and trigger download
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "virtual-card.pdf";
      a.click();
    } else {
      toast.error("Failed to download pdf.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to download pdf.");
  } finally {
    setIsLoading(false);
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
                <div className={VirtualCardStyle.flipCardFront} 
                ref={frontendRef}
                >
                  <FrontView
                    data={virtualData?.data} image={virtualData?.data?.image?.url}
                  />
                </div>
                <div className={VirtualCardStyle.flipCardBack}
                ref={backendRef}
                >
                  <BackView Qrcode={virtualData.qrCode} />
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center mt-6">
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
