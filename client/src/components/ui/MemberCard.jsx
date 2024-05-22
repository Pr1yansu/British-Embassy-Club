import React, { useEffect, useState } from "react";
import { memberItem } from "../../constants";
import { FiInfo } from "react-icons/fi";
import Pagination from "./Pagination";
import MembersDetails from "../modals/Member-details-full";
import { useGetAllMembersQuery } from "../../store/api/memberAPI";
import { formatDate } from "../../config/FormatDate";

const MemberCard = () => {
  const [open, setOpen] = useState(false);
  const [ memberId, setMemberId ] = useState();
  const { data, isSuccess, isLoading } = useGetAllMembersQuery();

  console.log(data);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  if (isLoading) return <div>Loading...</div>;


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = data && data.data && data.data.slice(indexOfFirstPost, indexOfLastPost);
  console.log(currentPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        {currentPost.map((item, index) => (
          <div
            className="col-span-3 p-2 rounded-lg shadow-member_card cursor-pointer bg-white"
            key={index}
          >
            <div className="flex items-center justify-between my-1 pb-3 border-b-2 border-primary mb-2">
              <div className="flex items-center gap-3">
                <img src={item.img} className="w-10" alt="member" />
                <div className="flex flex-col">
                  <p className="roboto text-base text-btn_primary">
                    {item.name}
                  </p>
                  <p className="text-xs">{item.username}</p>
                </div>
              </div>
              <FiInfo size={20} color="#1d4ed8" onClick={() => {setOpen(true);
              setMemberId(item._id)
              }} />
            </div>
            <div className="grid grid-rows-2 grid-cols-2 gap-2 justify-center">
              <div className="">
                <p className="text-xs text-text_secondary">Membership ID</p>
                <p className="text-xs">{item._id}</p>
              </div>
              <div className="">
                <p className="text-xs text-text_secondary">Membership</p>
                <p className="text-xs ">
                  {formatDate(item.expiryTime).toString()}
                </p>
              </div>
              <div className="">
                <p className="text-xs text-text_secondary">Mobile No.</p>
                <p className="text-xs">{item.mobileNumber}</p>
              </div>
              <div className="">
                <p className="text-xs text-text_secondary">Wallet</p>
                <p className="text-xs">{item.balance}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="fixed right-20 bottom-20">
          <Pagination
            postsPerPage={postsPerPage}
            totalPost={memberItem.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
        {open && <MembersDetails memberId={memberId} setOpen={setOpen} />}
      </div>
    </>
  );
};

export default MemberCard;
