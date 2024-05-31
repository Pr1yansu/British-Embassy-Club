import React from "react";
import DataTable from "react-data-table-component";
import { useGetAllTransactionsQuery } from "../../store/api/walletAPI";

const CouponTable = () => {
    const {
      data: allTransactions,
      isSuccess,
      isLoading: transLoading,
      isError,
    } = useGetAllTransactionsQuery();

  
    // if (transLoading) {
    //   return <p>Loading...</p>;
    // }

    console.log("table data",allTransactions);

    if (isError) {
      return <p>Error loading data.</p>;
    }
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

const data = [
  {
    SLNO: 1,
    MEMBERID: "BEC2024-05-30tomcat51",
    COUPONETYPE: "ISSUE",
    CASH: 1000,
    TIMESTAMP: "10:30",
    STATUS: "Paid",
  },
  {
    SLNO: 2,
    MEMBERID: "BEC2024-05-31bikram12352",
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