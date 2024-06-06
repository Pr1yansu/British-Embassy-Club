import React, { useState } from "react";
import VirtualCardStyle from "../../style/virtualCard.module.css";
import FrontView from "../modals/Card-front";
import BackView from "../modals/Card-back";

function VirtualCard({ onModal, data, image }) {
  const [open, setOpen] = useState(true);
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
            <div class={VirtualCardStyle.flipCard}>
              <div class={VirtualCardStyle.flipCardInner}>
                <div class={VirtualCardStyle.flipCardFront}>
                  <FrontView data={data} image={image} />
                </div>
                <div class={VirtualCardStyle.flipCardBack}>
                  <BackView />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VirtualCard;
