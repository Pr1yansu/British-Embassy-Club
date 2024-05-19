import React from "react";
import { TablePagination } from "react-pagination-table";
 
const data = [
  {
    SLNO: 1,
    MEMBERID: "BEC20240201DEMO01",
    COUPONETYPE: "ISSUE",
    CASH: 1000,
    TIMESTAMP: "10:30",
    STATUS: "Paid",
  },
  {
    SLNO: 2,
    MEMBERID: "BEC20240201DEMO01",
    COUPONETYPE: "RECEIVE",
    CASH: 1000,
    TIMESTAMP: "10:30",
    STATUS: "Due",
  },
  {
    SLNO: 3,
    MEMBERID: "BEC20240201DEMO01",
    COUPONETYPE: "ISSUE",
    CASH: 1000,
    TIMESTAMP: "10:30",
    STATUS: "Paid",
  },
  {
    SLNO: 4,
    MEMBERID: "BEC20240201DEMO01",
    COUPONETYPE: "RECEIVE",
    CASH: 1000,
    TIMESTAMP: "10:30",
    STATUS: "Due",
  },
  {
    SLNO: 5,
    MEMBERID: "BEC20240201DEMO01",
    COUPONETYPE: "RECEIVE",
    CASH: 1000,
    TIMESTAMP: "10:30",
    STATUS: "Due",
  },
];

const headers = [
  "SL.NO.",
  "MEMBER ID",
  "COUPONE TYPE",
  "CASH",
  "TIMESTAMP",
  "STATUS",
];


const CouponTable = () => {
  return (
    <div className="container p-4 bg-white rounded-2xl shadow-table_shadow">
      <h1 className="text-2xl tracking-tighter font-medium">
        Issue Coupon Table
      </h1>
      <TablePagination
        headers={headers}
        data={data}
        columns="SLNO.MEMBERID.COUPONETYPE.CASH.TIMESTAMP.STATUS"
        perPageItemCount={5}
        totalCount={data.length}
        className="border border-gray-300"
        columnClassName="border border-gray-300 px-4 py-2"
        headerClassName={`bg-red-500 border border-gray-300 px-4 py-2`}
        bodyClassName={`capitalize px-3 py-1 rounded-full inline-block`}
      />
    </div>
  );
};

export default CouponTable;
