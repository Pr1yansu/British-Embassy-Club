import React, { useState } from "react";
import AddMember from "./Add-member";
import Warning from "./Warning";

const ModalHome = () => {

    const [open,SetOpen] =  useState(false);
    
  return (
    <>
      <div className="h-screen w-full flex flex-col justify-center items-center bg-emerald-500">
        <button className="px-4 py-2 rounded-lg bg-blue-400" onClick={()=> SetOpen(!open)} >Open Modal</button>
        {
            open && (
                <Warning onModal={()=> SetOpen(false)}/>
                // <AddMember onModal={()=> SetOpen(false)}/>
            )
        }
      </div>
    </>
  );
};

export default ModalHome;
