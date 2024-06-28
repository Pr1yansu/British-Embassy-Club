import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import VirtualCardStyle from "../../style/virtualCard.module.css";
import FrontView from "../modals/Card-front";
import BackView from "../modals/Card-back";
import toast from "react-hot-toast";
import { BsFiletypePdf } from "react-icons/bs";
import { TbMailShare } from "react-icons/tb";
import { useGetMemberByIdQuery } from "../../store/api/memberAPI";
import Loader from "./loader";
import { toJpeg } from "html-to-image";

function VirtualCard({ onModal, data }) {
  const [open, setOpen] = useState(true);
  const frontendRef = useRef();
  const backendRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const {
    data: virtualData,
    isLoading: virtualCardLoading,
  } = useGetMemberByIdQuery({
    memberId: data._id,
  });

  useEffect(() => {
    if (isLoading) {
      setLoadingProgress(0);
      const interval = setInterval(() => {
        setLoadingProgress((oldProgress) => {
          if (oldProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return Math.min(oldProgress + 10, 100);
        });
      }, 200);
    } else {
      setLoadingProgress(0);
    }
  }, [isLoading]);

  if (virtualCardLoading) return <Loader />;

  const handleAction = async (action) => {
    try {
      setIsLoading(true);
      const frontImage = await toJpeg(frontendRef.current, {
        quality: 1,
        width: 360,
        height: 220,
      });
      const backImage = await toJpeg(backendRef.current, {
        quality: 1,
        width: 360,
        height: 220,
      });

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/member/${action}`,
        { frontImage, backImage, email: virtualData.data.email },
        { responseType: "blob" }
      );

      if (response.status === 200) {
        if (action === "send-card-email") {
          toast.success("Email sent successfully.");
        } else {
          const blob = new Blob([response.data], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "virtual-card.pdf";
          a.click();
          toast.success("PDF downloaded successfully.");
        }
      }
    } catch (error) {
      toast.error(
        `Failed to ${
          action === "send-card-email" ? "send email" : "download PDF"
        }.`
      );
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
          {isLoading && <LoadingIndicator progress={loadingProgress} />}
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
                </div>
                <div className={VirtualCardStyle.flipCardBack}>
                  <BackView
                    Qrcode={virtualData.qrCode}
                    backendRef={backendRef}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center mt-6">
              <button
                onClick={() => handleAction("send-card-email")}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                disabled={isLoading}
              >
                <TbMailShare />
              </button>
              <button
                onClick={() => handleAction("download-card-pdf")}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                disabled={isLoading}
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

const LoadingIndicator = ({ progress }) => (
  <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 z-30 flex items-center justify-center">
    <div className="w-full max-w-screen-sm rounded-md h-2 bg-gray-300 fixed">
      <div
        className="h-full bg-blue-500 transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
      <h4
        className={`text-white text-center font-semibold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
          progress === 100 ? "opacity-0" : "opacity-100"
        }`}
      >
        {progress === 100
          ? "Please wait while we process your request."
          : "Processing your request."}
      </h4>
    </div>
  </div>
);

export default VirtualCard;
