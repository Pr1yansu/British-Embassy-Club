import React, { useState } from "react";
import VirtualCardStyle from "../../style/virtualCard.module.css";
import FrontView from "../modals/Card-front";
import BackView from "../modals/Card-back";

function VirtualCard({ onModal }) {
  const [open, setOpen] = useState(true);
  return (
    <>
      {open && (
        <div
          className="fixed h-screen w-screen top-0 left-0 right-0 bottom-0 bg-zinc-400/25 z-20 flex items-center justify-center"
          onClick={() => {
            onModal();
            setOpen(false);
          }}
        >
          <div onClick={(val) => val.stopPropagation()}>
            <div class={VirtualCardStyle.flipCard}>
              <div class={VirtualCardStyle.flipCardInner}>
                <div class={VirtualCardStyle.flipCardFront}>
                  <FrontView />
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
