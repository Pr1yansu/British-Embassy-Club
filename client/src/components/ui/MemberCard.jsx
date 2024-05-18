import React, { useState } from "react";
import { memberItem } from "../../constants";
import { FiInfo } from "react-icons/fi";
import Pagination from "./Pagination";
import MembersDetails from "../modals/Member-details-full";
const MemberCard = () => {

  const [open,SetOpen] =  useState(false);

  const [currentPage,setCurrentPage] = useState(1);
  const [postsPerPage,setPostsPerPage] = useState(5)

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const cureentPost = memberItem.slice(indexOfFirstPost,indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <div className="grid grid-rows-4 grid-cols-5 gap-4">
        {cureentPost.map((item, index) => {
          return (
            <>
              <div className="w-64 h-40 p-3 rounded-lg shadow-member_card cursor-pointer bg-white" onClick={()=> SetOpen(true)}>
                <div className="flex items-center justify-between my-1 pb-3 border-b-2 border-primary mb-2">
                  <div className="flex items-center gap-3">
                    <img src={item.img} className="w-10" alt="member" />
                    <div className="flex flex-col">
                      <p className="roboto text-base text-btn_primary ">
                        {item.name}
                      </p>
                      <p className="text-xs">{item.username}</p>
                    </div>
                  </div>
                  <FiInfo size={20} color="#1d4ed8" />
                </div>
                <div className="grid grid-rows-2 grid-cols-2 gap-2 justify-center">
                  <div className="">
                    <p className="text-xs text-text_secondary">Membership ID</p>
                    <p className="text-xs">{item.member_ID}</p>
                  </div>
                  <div className="">
                    <p className="text-xs text-text_secondary">Membership</p>
                    <p className="text-xs ">{item.membership}</p>
                  </div>
                  <div className="">
                    <p className="text-xs text-text_secondary">Mobile No.</p>
                    <p className="text-xs">{item.mobile}</p>
                  </div>
                  <div className="">
                    <p className="text-xs text-text_secondary">Wallet</p>
                    <p className="text-xs">{item.balance}</p>
                  </div>
                </div>
              </div>
              {
                open && (<MembersDetails setOpen={()=> SetOpen(false)}/>)
              }
            </>
          );
        })}
        <div className="row-start-4 row-end-5 col-start-5 col-end-6">
        <Pagination postsPerPage={postsPerPage} totalPost={memberItem.length} currrentPage={currentPage} paginate={paginate}/>
        </div>
      </div>
    </>
  );
};

export default MemberCard;
