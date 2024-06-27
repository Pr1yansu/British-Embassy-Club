import React from "react";
import DataTable from "react-data-table-component";
import { Export } from "./Export"; // Adjust the import path as needed
import { useGetAllTransactionsQuery } from "../../store/api/walletAPI";
import { formatTime } from "../../hooks/formatTime";

const TableDemo = () => {
  const formattedData = [
    {
      NAME: "John Doe",
      MEMBERID: "BEC2406246",
      COUPONTYPE: "Discount",
      COUPONAMOUNT: 50,
      PAYAMOUNT: 150,
      BALANCE: 100,
      TIMESTAMP: "2024-06-24",
      STATUS: "PAID",
    },
    {
      NAME: "Jane Doe",
      MEMBERID: "BEC2406246",
      COUPONTYPE: "Gift",
      COUPONAMOUNT: 100,
      PAYAMOUNT: 200,
      BALANCE: 100,
      TIMESTAMP: "2024-06-23",
      STATUS: "DUE",
    },
    {
      NAME: "John Doe",
      MEMBERID: "BEC2406246",
      COUPONTYPE: "Discount",
      COUPONAMOUNT: 75,
      PAYAMOUNT: 125,
      BALANCE: 100,
      TIMESTAMP: "2024-06-22",
      STATUS: "PAID",
    },
    {
      NAME: "Jane Doe",
      MEMBERID: "BEC2406246",
      COUPONTYPE: "Cashback",
      COUPONAMOUNT: 30,
      PAYAMOUNT: 170,
      BALANCE: 100,
      TIMESTAMP: "2024-06-21",
      STATUS: "DUE",
    },
    {
      NAME: "John Doe",
      MEMBERID: "BEC2406246",
      COUPONTYPE: "Gift",
      COUPONAMOUNT: 50,
      PAYAMOUNT: 150,
      BALANCE: 100,
      TIMESTAMP: "2024-06-20",
      STATUS: "PAID",
    },
    {
      NAME: "John Doe",
      MEMBERID: "BEC2406246",
      COUPONTYPE: "Gift",
      COUPONAMOUNT: 50,
      PAYAMOUNT: 150,
      BALANCE: 100,
      TIMESTAMP: "2024-06-20",
      STATUS: "PAID",
    },
    {
      NAME: "John Doe",
      MEMBERID: "BEC2406246",
      COUPONTYPE: "Gift",
      COUPONAMOUNT: 50,
      PAYAMOUNT: 150,
      BALANCE: 100,
      TIMESTAMP: "2024-06-20",
      STATUS: "PAID",
    },
    {
      NAME: "John Doe",
      MEMBERID: "BEC2406246",
      COUPONTYPE: "Gift",
      COUPONAMOUNT: 50,
      PAYAMOUNT: 150,
      BALANCE: 100,
      TIMESTAMP: "2024-06-20",
      STATUS: "PAID",
    },
    {
      NAME: "John Doe",
      MEMBERID: "BEC2406246",
      COUPONTYPE: "Gift",
      COUPONAMOUNT: 50,
      PAYAMOUNT: 150,
      BALANCE: 100,
      TIMESTAMP: "2024-06-20",
      STATUS: "PAID",
    },
    {
      NAME: "John Doe",
      MEMBERID: "BEC2406246",
      COUPONTYPE: "Gift",
      COUPONAMOUNT: 50,
      PAYAMOUNT: 150,
      BALANCE: 100,
      TIMESTAMP: "2024-06-20",
      STATUS: "PAID",
    },
    {
      NAME: "John Doe",
      MEMBERID: "BEC2406246",
      COUPONTYPE: "Gift",
      COUPONAMOUNT: 50,
      PAYAMOUNT: 150,
      BALANCE: 100,
      TIMESTAMP: "2024-06-20",
      STATUS: "PAID",
    },
    {
      NAME: "John Doe",
      MEMBERID: "BEC2406246",
      COUPONTYPE: "Gift",
      COUPONAMOUNT: 50,
      PAYAMOUNT: 150,
      BALANCE: 100,
      TIMESTAMP: "2024-06-20",
      STATUS: "PAID",
    },
    {
      NAME: "John Doe",
      MEMBERID: "BEC2406246",
      COUPONTYPE: "Gift",
      COUPONAMOUNT: 50,
      PAYAMOUNT: 150,
      BALANCE: 100,
      TIMESTAMP: "2024-06-20",
      STATUS: "PAID",
    },
    {
      NAME: "John Doe",
      MEMBERID: "BEC2406246",
      COUPONTYPE: "Gift",
      COUPONAMOUNT: 50,
      PAYAMOUNT: 150,
      BALANCE: 100,
      TIMESTAMP: "2024-06-20",
      STATUS: "PAID",
    },
    {
      NAME: "John Doe",
      MEMBERID: "BEC2406246",
      COUPONTYPE: "Gift",
      COUPONAMOUNT: 50,
      PAYAMOUNT: 150,
      BALANCE: 100,
      TIMESTAMP: "2024-06-20",
      STATUS: "PAID",
    },
    {
      NAME: "John Doe",
      MEMBERID: "BEC2406246",
      COUPONTYPE: "Gift",
      COUPONAMOUNT: 50,
      PAYAMOUNT: 150,
      BALANCE: 100,
      TIMESTAMP: "2024-06-20",
      STATUS: "PAID",
    },
  ];

  const handleExport = () => {
    const csvData = formattedData.map((row) => ({
      ...row,
      TIMESTAMP: formatTime(row.TIMESTAMP), 
    }));

    const csvContent = [
      [
        "Tr.No",
        "Date",
        "Name",
        "Member ID",
        "Transaction Type",
        "Issue Amount",
        "Receive Amount",
        "Wallet Transaction",
        "Wallet Amount",
        "Tr.Mode",
      ],
      ...csvData.map((row, index) => [
        index + 1,
        row.TIMESTAMP,
        row.NAME,
        row.MEMBERID,
        row.COUPONTYPE,
        row.COUPONAMOUNT,
        row.PAYAMOUNT,
        row.BALANCE,
        row.BALANCE,
        row.STATUS,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;"});
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "transactions.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg custom-pagination font-roboto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-roboto font-medium text-black tracking-tighter">
          Transaction Table
        </h1>
        <Export onExport={handleExport} />
      </div>
      <DataTable
        columns={columns}
        data={formattedData}
        customStyles={customStyles}
        pagination
        paginationPerPage={10}
        paginationTotalRows={formattedData.length}
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

export default TableDemo;

const columns = [
  {
    name: "Tr.No",
    selector: (row, index) => index + 1,
    sortable: true,
  },
  {
    name: "Date",
    selector: (row) => row.TIMESTAMP,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.NAME,
  },
  {
    name: "Member ID",
    selector: (row) => row.MEMBERID,
  },
  {
    name: "Transaction Type",
    selector: (row) => row.COUPONTYPE,
  },
  {
    name: "Issue Amount",
    selector: (row) => row.COUPONAMOUNT,
  },
  {
    name: "Receive Amount",
    selector: (row) => row.PAYAMOUNT,
  },
  {
    name: "Wallet Transaction",
    selector: (row) => row.BALANCE,
  },
  {
    name: "Wallet Amount",
    selector: (row) => row.BALANCE,
  },
  {
    name: "Tr.Mode",
    selector: (row) => row.STATUS,
    sortable: true,
    wrap: true,
    cell: (row) => (
      <p
        className={`rounded-full flex items-center text-white tracking-tighter ${
          row.STATUS === "PAID"
            ? "bg-[#22C55E]"
            : row.STATUS === "DUE"
            ? "bg-[#E11D48]"
            : "bg-[#0000FF]"
        }`}
        style={{ fontFamily: "Lato", fontSize: "12px", padding: "4px 12px" }}
      >
        {row.STATUS}
      </p>
    ),
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
      whiteSpace: "normal",
      wordWrap: "break-word",
      wordBreak: "break-word",
      textAlign: "left",
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
      whiteSpace: "normal",
      wordWrap: "break-word",
      wordBreak: "break-word",
    },
  },
};
