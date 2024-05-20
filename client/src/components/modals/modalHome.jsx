import React, { useState } from "react";
import Warning from "./Warning";
import MembersDetails from "./Member-details-full";
import OperatorIssue from "./Operator-issue";
import AddMember from "./Add-member";
import OperatorQuery from "./Operator-query";
import OperatorReceive from "./Operator-receive";
import ValidityExtend from "./ValidityExtend";
import ConfirmationExtend from "./ConfirmationExtend";

const ModalHome = () => {

    const [open,SetOpen] =  useState(false);
    
  return (
    <>
      <div className="h-screen w-full flex flex-col justify-center items-center bg-emerald-500">
        <button className="px-4 py-2 rounded-lg bg-blue-400" onClick={()=> SetOpen(!open)} >Open Modal</button>
        {
            open && (
                // <Warning onModal={()=> SetOpen(false)}/>
                // <AddMember onModal={()=> SetOpen(false)}/>
                // <MembersDetails setOpen={()=> SetOpen(false)}/>
                <OperatorIssue />
                // <OperatorQuery onOpen={()=> SetOpen(false)}/>
                // <OperatorReceive />
                // <ValidityExtend/>
                // <ConfirmationExtend/>
            )
        }
      </div>
    </>
  );
};

export default ModalHome;
