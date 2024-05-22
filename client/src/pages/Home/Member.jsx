import React, { useState } from "react";
import SearchBox from "../../components/ui/SearchBox";
import AddButton from "../../components/ui/AddButton";
import { IoMdAddCircleOutline } from "react-icons/io";
import AddMember from "../../components/modals/Add-member";
import MemberCard from "../../components/ui/MemberCard";
import { useGetAllMembersQuery } from "../../store/api/memberAPI";
import ReactPaginate from 'react-paginate';
import { GrPrevious,GrNext } from "react-icons/gr";
const Member = () => {
  const [open, SetOpen] = useState(false);
  const [postsPerPage, setPostsPerPage] = useState(12);
  const [itemOffset, setItemOffset] = useState(0);

  const { data, isSuccess, isLoading } = useGetAllMembersQuery();

  if (isLoading) return <div>Loading...</div>;

  console.log("From memeber ", data);

  const endOffset = itemOffset + postsPerPage;
  const currentItems = data?.data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data?.data?.length / postsPerPage);

  const handlePageChange = (event) => {
    const selectedPage = event.selected;
    setItemOffset(selectedPage * postsPerPage);

  };
  

  console.log("page count", pageCount);

  return (
    <>
      <div className="background bg-cover bg-center">
        <div className="container w-full h-screen grid grid-rows-12 grid-cols-12 gap-4">
          <div className="row-start-2 row-end-3 col-start-2 col-end-10 ">
            <SearchBox
              placeholder={
                "Search by Member Ref. number, Name, Email, Phone number......"
              }
              type={"text"}
            />
          </div>
          <div
            className="row-start-2 row-end-3 col-start-10 col-end-12 "
            onClick={() => SetOpen(true)}
          >
            <AddButton
              name={"Add Member"}
              icon={<IoMdAddCircleOutline size={22} />}
            />
          </div>
          <div className="row-start-3 row-end-11 col-start-2 col-end-12">
            <div className="grid grid-cols-12 gap-4">
              {currentItems && currentItems.map((item, index) => {
                return <MemberCard item={item} index={index} />;
              })}
            </div>
            <div className="fixed right-20 bottom-5">
              <div className="flex gap-2">
                <ReactPaginate
                  pageCount={pageCount}
                  setPostsPerPage={setPostsPerPage}
                  onPageChange={handlePageChange}
                  nextLabel={<GrNext />}
                  previousLabel={<GrPrevious />}
                  breakLabel={"..."}
                  marginPagesDisplayed={2}
                  className="flex justify-center items-center gap-2 font-roboto text-lg text-btn_primary p-2"
                  pageClassName="px-2 border-2 border-btn_primary rounded-md hover:bg-btn_primary hover:text-white"
                  activeClassName="bg-btn_primary text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && <AddMember onModal={() => SetOpen(false)} />}
    </>
  );
};

export default Member;
