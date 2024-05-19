import React from "react";
import { IoIosArrowForward,IoIosArrowBack } from "react-icons/io";

const Pagination = ({ totalPost, postsPerPage, currrentPage, paginate }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalPost / postsPerPage); i++) {
    pageNumber.push(i);
  }
  const lastPage = Math.ceil(totalPost / postsPerPage);
  return (
    <>
      <ul className="flex gap-1 justify-center w-full">
        <li onClick={()=> (currrentPage==1 ?paginate(lastPage) :paginate(currrentPage-1))} className="cursor-pointer"><IoIosArrowBack size={30} color="#1D4ED8"/></li>
        {pageNumber.map(
          (number, index) =>
            (number <= 3 || number==currrentPage) && (
              <li
                key={index}
                className={`hover:text-primary text-btn_primary border-2 border-btn_primary cursor-pointer hover:bg-blue-600 ${number==currrentPage && 'bg-blue-600'} ${number==currrentPage && 'text-primary'} px-2 py-1 rounded-sm`}
                onClick={() => paginate(number)}
              >
                {number}
              </li>
            )
        )}
        {pageNumber.length > 3 && currrentPage!=lastPage && (
          <div className="flex items-center gap-1">
            <p className="text-center font-bold">....</p>
            <li className="hover:text-primary text-btn_primary border-2 border-btn_primary cursor-pointer hover:bg-blue-600 px-2 py-1 rounded-sm" onClick={() => paginate(lastPage)}>
              {lastPage}
            </li>
          </div>
        )}
        <li onClick={()=> (currrentPage==lastPage?paginate(1):paginate(currrentPage+1))} className="cursor-pointer">
        <IoIosArrowForward size={30} color="#1D4ED8"/>
        </li>
      </ul>
    </>
  );
};

export default Pagination;
