import React from "react";
import DataTable from "react-data-table-component";

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

const columns = [
  {
    name: "SL.No.",
    selector: (row) => row.SLNO,
  },
  {
    name: "Member ID",
    selector: (row) => row.MEMBERID,
    sortable: true,
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
      <span
        className={`px-6 py-1 rounded-full text-white text-sm tracking-tighter ${
          row.STATUS === "Paid" ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {row.STATUS}
      </span>
    ),
    width: "100px",
  },
];

const customStyles = {
  table: {
    style: {
      backgroundColor: "#FFFFFF",
      width: "100%",
      borderRadius: "0.75rem",
      overflow: "hidden",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#F3F4F6",
    },
  },
  headCells: {
    style: {
      color: "#1E3A8A",
      fontSize: "14px",
      fontWeight: "600",
    },
  },
  cells: {
    style: {
      fontSize: "14px",
      fontWeight: "400",
      alignItems: "center",
      padding: "8px", // Adjust the padding as necessary
    },
  },

};

const customPaginationComponent = ({
  currentPage,
  totalPages,
  pageCount,
  changePage,
}) => {
  return (
    <div className="flex justify-between items-center">
      <button
        disabled={currentPage <= 1}
        onClick={() => changePage(currentPage - 1)}
        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
      >
        Previous
      </button>
      <span className="mx-2 text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage >= totalPages}
        onClick={() => changePage(currentPage + 1)}
        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
      >
        Next
      </button>
    </div>
  );
};

const CouponTable = () => {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      {/* Your existing content... */}
      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
        pagination
        paginationPerPage={5}
        paginationComponent={customPaginationComponent}
        highlightOnHover
        pointerOnHover
        striped
        dense
        noHeader
        responsive
        noDataComponent="No data available"
        className="text-sm tracking-tighter"
      />
    </div>
  );
};

export default CouponTable;
