import React from "react";
import DataTable from "react-data-table-component";
import { useFetchTransactionsQuery } from "../../store/api/walletAPI";

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
  {
    SLNO: 6,
    MEMBERID: "BEC20240201DEMO01",
    COUPONETYPE: "RECEIVE",
    CASH: 1000,
    TIMESTAMP: "10:30",
    STATUS: "Due",
  },
  {
    SLNO: 7,
    MEMBERID: "BEC20240201DEMO01",
    COUPONETYPE: "RECEIVE",
    CASH: 1000,
    TIMESTAMP: "10:30",
    STATUS: "Due",
  },
  {
    SLNO: 8,
    MEMBERID: "BEC20240201DEMO01",
    COUPONETYPE: "RECEIVE",
    CASH: 1000,
    TIMESTAMP: "10:30",
    STATUS: "Due",
  },
  {
    SLNO: 9,
    MEMBERID: "BEC20240201DEMO01",
    COUPONETYPE: "RECEIVE",
    CASH: 1000,
    TIMESTAMP: "10:30",
    STATUS: "Due",
  },
  {
    SLNO: 10,
    MEMBERID: "BEC20240201DEMO01",
    COUPONETYPE: "RECEIVE",
    CASH: 1000,
    TIMESTAMP: "10:30",
    STATUS: "Due",
  },
  {
    SLNO: 11,
    MEMBERID: "BEC20240201DEMO01",
    COUPONETYPE: "RECEIVE",
    CASH: 1000,
    TIMESTAMP: "10:30",
    STATUS: "Due",
  },
  {
    SLNO: 12,
    MEMBERID: "BEC20240201DEMO01",
    COUPONETYPE: "RECEIVE",
    CASH: 1000,
    TIMESTAMP: "10:30",
    STATUS: "Due",
  },
  {
    SLNO: 13,
    MEMBERID: "BEC20240201DEMO01",
    COUPONETYPE: "RECEIVE",
    CASH: 1000,
    TIMESTAMP: "10:30",
    STATUS: "Due",
  },
  {
    SLNO: 14,
    MEMBERID: "BEC20240201DEMO01",
    COUPONETYPE: "RECEIVE",
    CASH: 1000,
    TIMESTAMP: "10:30",
    STATUS: "Due",
  },
];

const columns = [
  {
    name: "SL.No.",
    selector: (row) => row.SLNO,
  },
  {
    name: "Member ID",
    selector: (row) => row.MEMBERID,
    grow: 2,
    wrap: true,
  },
  {
    name: "Coupone Type",
    selector: (row) => row.COUPONETYPE,
    // sortable: true,
  },
  {
    name: "Cash",
    selector: (row) => row.CASH,
    // sortable: true,
  },
  {
    name: "Timestamp",
    selector: (row) => row.TIMESTAMP,
    // sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.STATUS,
    cell: (row) => (
      <p
        className={`rounded-full flex items-center text-white tracking-tighter ${
          row.STATUS === "Paid" ? "bg-[#22C55E]" : "bg-[#E11D48]"
        }`}
        style={{ fontFamily: "Lato", fontSize: "12px", padding: "4px 12px"}}
      >
        {row.STATUS}
      </p>
    ),
    // width: "100px",
  },
];

const customStyles = {
  table: {
    style: {
      backgroundColor: "#FFFFFF",
      width: "100%",
      borderRadius: "0.75rem",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      overflowY: "auto",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#F3F4F6",
    },
  },
  headCells: {
    style: {
      color: "#6B7280",
      fontFamily: "Roboto",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "normal",
    },
  },
  cells: {
    style: {
      color: "#030712",
      fontFamily: "Lato",
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",
    },
  },
};

const CouponTable = () => {
    const {
      data: allTransactions,
      isSuccess,
      isLoading: transLoading,
      isError,
    } = useFetchTransactionsQuery();

    // if (transLoading) {
    //   return <p>Loading...</p>;
    // }

    // if (isError) {
    //   return <p>Error loading data.</p>;
    // }
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg custom-pagination font-roboto">
      <h1 className="text-2xl font-roboto font-medium text-black tracking-tighter">
        Issue Coupons Table
      </h1>
      <h1 className="text-sm font-roboto font-medium text-text_primary tracking-tighter mb-2">
        100 Coupons Today
      </h1>
      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
        paginationComponentOptions={{
          rowsPerPageText: "Rows:",
          rangeSeparatorText: "of",
          noRowsPerPage: false,
          selectAllRowsItem: false,
          selectAllRowsItemText: "All",
        }}
        highlightOnHover
        pointerOnHover
        striped
        dense
        noHeader
        responsive
        noDataComponent="No data available"
      />
    </div>
  );
};

export default CouponTable;
