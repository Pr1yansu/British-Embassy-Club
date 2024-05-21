import React, { useState } from "react";
import { memberItem } from "../../constants";
import { FiInfo } from "react-icons/fi";
import Pagination from "./Pagination";
import MembersDetails from "../modals/Member-details-full";

const MemberCard = () => {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = memberItem.slice(indexOfFirstPost, indexOfLastPost);
  console.log(currentPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="grid grid-rows-4 grid-cols-5 gap-4">
        {currentPost.map((item, index) => (
          <div
            className="col-span-1 p-2 rounded-lg shadow-member_card cursor-pointer bg-white"
            onClick={() => setOpen(true)}
            key={index}
          >
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
        ))}
        <div className="row-start-4 row-end-5 col-start-5 col-end-6">
          <Pagination
            postsPerPage={postsPerPage}
            totalPost={memberItem.length}
            currentPage={currentPage}
            paginate={paginate}
            />
        </div>
            {open && <MembersDetails setOpen={setOpen} />}
      </div>
    </>
  );
};

export default MemberCard;
