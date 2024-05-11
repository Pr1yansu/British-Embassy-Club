import React, { useState } from "react";
import { createPortal } from 'react-dom';
import FileUpload from "./File-Upload";
import Modal from "../ui/Modal";
import AddMember from "./Add-member";

const ModalHome = () => {

    const [open,SetOpen] =  useState(false);
    
  return (
    <>
      <div className="h-screen w-full flex flex-col justify-center items-center bg-emerald-500">
        <button className="px-4 py-2 rounded-lg bg-blue-400" onClick={()=> SetOpen(!open)} >Open Modal</button>
        {
            open && (
                <AddMember onModal={()=> SetOpen(false)}/>
            )
        }
      </div>
    </>
  );
};

export default ModalHome;
