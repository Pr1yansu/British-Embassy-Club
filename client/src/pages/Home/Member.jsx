import React, { useEffect, useState } from "react";
import SearchBox from "../../components/ui/SearchBox";
import AddButton from "../../components/ui/AddButton";
import { IoMdAddCircleOutline } from "react-icons/io";
import AddMember from "../../components/modals/Add-member";
import MemberCard from "../../components/ui/MemberCard";
import { useGetAllMembersQuery } from "../../store/api/memberAPI";
import ReactPaginate from "react-paginate";
import { GrPrevious, GrNext } from "react-icons/gr";
import Loader from "../../components/ui/loader";
import { useNavigate } from "react-router-dom";
import { useGetOperatorProfileQuery } from "../../store/api/operatorAPI";
import { toast } from "react-hot-toast";
import Toasts from "../../components/ui/Toasts";
import { FaExclamationTriangle } from "react-icons/fa";
import { LuLoader2 } from "react-icons/lu";
const Member = () => {
  const navigate = useNavigate();
  const [open, SetOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading: memberLoading , refetch} = useGetAllMembersQuery({
    page: page === 0 ? 1 : page,
    limit: 12,
    search: search,
  });

  const { data: profiledata, isLoading } = useGetOperatorProfileQuery();

  useEffect(() => {
    if (profiledata) {
      if (!profiledata.data) {
        navigate("/login/operator");
      }
    }
  }, [profiledata]);

  if (isLoading) {
    return <LuLoader2 />;
  }

  if (memberLoading) return <LuLoader2 />;

  if (data && data.data.length === 0) {
    toast.custom(
      <>
        <Toasts
          boldMessage={"Alert!"}
          message={"No Member Found"}
          icon={
            <FaExclamationTriangle className="text-text_orange" size={32} />
          }
        />
      </>,
      {
        position: "top-right",
        duration: 2000,
      }
    );
  }

  const pageCount = Math.ceil(data?.totalMembers / 12);

  const handlePageChange = (event) => {
    const selectedPage = event.selected;
    setPage(selectedPage + 1);
  };

  return (
    <>
      <div className="background bg-cover bg-center">
        <div className="container w-full h-screen grid grid-rows-12 grid-cols-12 gap-4 mx-auto">
          <div className="row-start-2 row-end-3 col-start-2 col-end-10 ">
            <SearchBox
              placeholder={
                "Search by Member Ref. number, Name, Email, Phone number......"
              }
              type={"text"}
              onchange={(e) =>
                setTimeout(() => {
                  setSearch(e.target.value);
                }, 1000)
              }
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
          <div className="row-start-3 row-end-11 col-start-2 col-end-12 items-center">
            <div className="grid grid-cols-12 gap-4 ">
              {data && data.data && data.data.length > 0 ? (
                data.data.map((item, index) => {
                  return <MemberCard item={item} index={index} key={index} />;
                })
              ) : (
                <div className="col-span-12 mt-6">
                  <h1 className="text-center text-3xl font-bold text-text_primary tracking-normal">
                    No Member Found
                  </h1>
                </div>
              )}
            </div>
            <div className="fixed right-20 bottom-5">
              <div className="flex gap-2">
                <ReactPaginate
                  pageCount={pageCount}
                  setPostsPerPage={12}
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
