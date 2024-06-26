import React, { useRef, useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null); // State to hold PDF URL
  const frontendRef = useRef();
  const backendRef = useRef();
  const backTransformRef = useRef();
  const [frontImageSrc, setFrontImageSrc] = useState(null); // State to hold frontend image src
  const [backImageSrc, setBackImageSrc] = useState(null); // State to hold backend image src

  const {
    data: virtualData,
    isLoading: virtualCardLoading,
  } = useGetMemberByIdQuery({ memberId: data._id });

  if (virtualCardLoading) return <Loader />;

  const captureCanvas = async (ref) => {
    const element = ref.current;
    backTransformRef.current.style.transform = "none";
    const canvas = await html2canvas(element, {
      windowWidth: 360,
      windowHeight: 320,
    });
    backTransformRef.current.style.transform = "rotateY(180deg)";
    return canvas.toDataURL("image/png", {
      width: 360,
      height: 320,
    });
  };

  const sendCardAsEmail = async () => {
    try {
      const input = document.getElementById("virtual-card");
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");

      if (!data.email) {
        return toast.error("Please provide an email address.");
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/member/send-card-email`,
        { image: imgData, email: data.email }
      );

      response.status === 200
        ? toast.success("Email sent successfully!")
        : toast.error("Failed to send email.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send email.");
    }
  };

  const downloadAsPdf = async () => {
    setIsLoading(true);
    try {
      const frontImage = await captureCanvas(frontendRef);
      const backImage = await captureCanvas(backendRef);

      setFrontImageSrc(frontImage);
      setBackImageSrc(backImage);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/member/download-card-pdf`,
        { frontimage: frontImage, backimage: backImage },
        { responseType: "blob" }
      );

      if (response.status === 200) {
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl);
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.setAttribute("download", "virtual-card.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
    <div
      className="fixed h-screen w-screen top-0 left-0 right-0 bottom-0 bg-black/50 z-20 flex items-center justify-center"
      onClick={() => onModal()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="hover:cursor-pointer"
      >
        <div id="virtual-card" className={VirtualCardStyle.flipCard}>
          <div className={VirtualCardStyle.flipCardInner}>
            <div className={VirtualCardStyle.flipCardFront}>
              <FrontView
                data={virtualData?.data}
                image={virtualData?.data?.image?.url}
                frontendRef={frontendRef}
              />
              {/* {frontImageSrc && (
                <img
                  src={frontImageSrc}
                  alt="Frontend Image"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    marginTop: "10px",
                  }}
                />
              )} */}
            </div>
            <div
              className={VirtualCardStyle.flipCardBack}
              ref={backTransformRef}
            >
              <BackView Qrcode={virtualData.qrCode} backendRef={backendRef} />
              {/* {backImageSrc && ( // Display backend image preview if available
                <img
                  src={backImageSrc}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    marginTop: "10px",
                  }}
                  alt="Backend Image"
                />
              )} */}
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center mt-6">
          <button
            onClick={sendCardAsEmail}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            disabled={isLoading}
          >
            <TbMailShare />
          </button>
          <button
            onClick={downloadAsPdf}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            disabled={isLoading}
          >
            <BsFiletypePdf />
          </button>
        </div>
      </div>
    </div>
  );
}

export default VirtualCard;
