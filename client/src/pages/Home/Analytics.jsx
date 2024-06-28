import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useGetAllTransactionsQuery } from "../../store/api/walletAPI";
import { formatTime } from "../../hooks/formatTime";
import SearchBox from "../../components/ui/SearchBox";
import { ButtonGroup } from "@mui/material";
import { Export } from "../../components/ui/Export";
import { useNavigate } from "react-router-dom";

const Analytics = ({ reloadQuery }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [inputStartDate, setInputStartDate] = useState("");
  const [inputEndDate, setInputEndDate] = useState("");
  const navigate = useNavigate();
  const {
    data: allTransactions,
    isLoading: transLoading,
    refetch,
  } = useGetAllTransactionsQuery({ startDate, endDate });

  React.useEffect(() => {
    refetch();
  }, [reloadQuery, refetch, startDate, endDate]);

  const formattedData = React.useMemo(
    () =>
      allTransactions?.data?.map((transaction, index) => ({
        DATE: formatTime(transaction.timeStamp),
        MEMBERID: transaction.memberId,
        FULLNAME: transaction.memberName,
        CREDITAMOUNT: transaction.creditAmount,
        DEBITAMOUNT: transaction.debitAmount,
        WALLETTR: transaction.couponAmount,
        WALLETBALANCE: transaction.walletAmount,
        MODE: transaction.mode,
      })) || [],
    [allTransactions]
  );

  console.log(allTransactions);

  if (transLoading) {
    return <p className="text-center">Loading...</p>;
  }

  const handleExport = () => {
    const csvData = formattedData.map((row) => ({
      ...row,
      TIMESTAMP: formatTime(row.TIMESTAMP),
    }));

    const csvContent = [
      [
        "Date",
        "Membership ID",
        "Full Name",
        "Credit Amount",
        "Debit Amount",
        "Wallet Tr.",
        "Wallet Balance",
        "Tr. Mode",
      ],
      ...csvData.map((row) => [
        `"${row.DATE}"`,
        `"${row.MEMBERID}"`,
        `"${row.FULLNAME}"`,
        `"${row.CREDITAMOUNT}"`,
        `"${row.DEBITAMOUNT}"`,
        `"${row.WALLETTR}"`,
        `"${row.WALLETBALANCE}"`,
        `"${row.MODE}"`,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "transactions.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (allTransactions?.data?.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <h1 className="text-center text-3xl font-bold text-text_primary tracking-normal">
          No data available
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-3">
      <div className="flex flex-col lg:flex-row justify-center items-center w-full max-w-6xl gap-10 mb-5 mt-5">
        <div className="w-96 ml-16 sm:ml-0 sm:w-117 py-3 px-12 bg-white flex flex-col justify-center items-center rounded-2xl shadow-lg custom-pagination gap-3 font-roboto">
          <p className="text-xl text-text_secondary mb-1 text-center">
            Select options for the statement period
          </p>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center gap-2 w-full">
              <label className="text-base roboto">Start Date</label>
              <input
                type="date"
                className="w-full lg:w-40 h-8 text-text_secondary p-2 border border-gray-300 rounded-md"
                onChange={(e) => setInputStartDate(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              <label className="text-base roboto">End Date</label>
              <input
                type="date"
                className="w-full lg:w-40 h-8 text-text_secondary p-2 border border-gray-300 rounded-md"
                onChange={(e) => setInputEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setStartDate("");
                setEndDate("");
                setInputStartDate("");
                setInputEndDate("");
                navigate(0);
              }}
              className="w-20 h-8 rounded-md  hover:bg-blue-500 hover:text-white transition ease-in-out delay-150 duration-300 roboto text-base hover:roboto hover:text-base"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (inputStartDate === "" || inputEndDate === "") {
                  alert("Please select start and end date to proceed");
                  return;
                }
                setStartDate(inputStartDate);
                setEndDate(inputEndDate);
              }}
              className="w-20 h-8 text-text_secondary hover:bg-blue-500 hover:text-white rounded-md transition ease-in-out delay-150 duration-300 roboto text-base hover:roboto hover:text-base"
            >
              Confirm
            </button>
          </div>
        </div>

        <div className="w-96 ml-16 sm:ml-0 sm:w-117 py-6 px-12 bg-white flex flex-col justify-center items-center rounded-2xl shadow-lg custom-pagination gap-3 font-roboto">
          <p className="text-xl text-text_secondary mb-1 text-center">
            Daily Transaction Analysis
          </p>
          <div className="flex justify-between items-center gap-2 w-full">
            <p className="text-base roboto">Total Transactions Today:</p>
            <p className="text-base roboto font-bold">
              {allTransactions?.todaysTotalTransactions}
            </p>
          </div>
          <div className="flex justify-between items-center gap-2 w-full">
            <p className="text-base roboto">Total Credited Amount:</p>
            <p className="text-base roboto font-bold">
              {allTransactions?.totalCredited}
            </p>
          </div>
          <div className="flex justify-between items-center gap-2 w-full">
            <p className="text-base roboto">Total Credited Amount:</p>
            <p className="text-base roboto font-bold">
              {allTransactions?.totalDebited}
            </p>
          </div>
        </div>
      </div>
      <div className="md:w-full md:max-w-6xl w-96 ml-16 sm:ml-0 max-w-4xl p-3 bg-white rounded-2xl shadow-lg custom-pagination font-roboto">
        <div className="flex flex-col md:flex-row justify-between items-center p-2 gap-4">
          <h1 className="text-xl font-roboto font-medium text-black tracking-tighter text-center">
            Transaction Table
          </h1>
          <div className="w-full md:w-1/2 h-10">
            <SearchBox
              placeholder={
                "Search by Member Name or ID to view total Transaction data"
              }
              type={"text"}
            />
          </div>
          <Export onExport={handleExport} />
        </div>
        <DataTable
          columns={columns}
          data={formattedData}
          customStyles={customStyles}
          pagination
          paginationPerPage={8}
          paginationTotalRows={formattedData.length}
          paginationRowsPerPageOptions={[5, 8, 15, 20]}
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
    </div>
  );
};

export default Analytics;

const columns = [
  {
    name: "Date",
    selector: (row) => row.DATE,
  },
  {
    name: "Membership ID",
    selector: (row) => row.MEMBERID,
    grow: 2,
    wrap: true,
  },
  {
    name: "Full Name",
    selector: (row) => row.FULLNAME,
    wrap: true,
  },
  {
    name: "Credit Amount",
    selector: (row) => row.CREDITAMOUNT,
  },
  {
    name: "Debit Amount",
    selector: (row) => row.DEBITAMOUNT,
  },
  {
    name: "Wallet Tr.",
    selector: (row) => row.WALLETTR,
  },
  {
    name: "Wallet Balance",
    selector: (row) => row.WALLETBALANCE,
  },
  {
    name: "Tr. Mode",
    selector: (row) => row.TRMODE,
    sortable: true,
    cell: (row) => (
      <p
        className={`rounded-full flex items-center text-white tracking-tighter ${
          row.MODE === "CASH"
            ? "bg-[#22C55E]"
            : row.MODE === "CARD"
            ? "bg-[#0000FF]"
            : row.MODE === "UPI"
            ? "bg-[#FBBF24]"
            : "bg-[#F87171]"
        }`}
        style={{ fontFamily: "Lato", fontSize: "12px", padding: "4px 12px" }}
      >
        {row.MODE}
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
      maxHeight: "400px", // Add this line to restrict table height
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
