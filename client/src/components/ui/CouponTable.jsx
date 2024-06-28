import React from "react";
import DataTable from "react-data-table-component";
import { useGetAllTransactionsQuery } from "../../store/api/walletAPI";
import { formatTime } from "../../hooks/formatTime";
import { Export } from "./Export";

const CouponTable = ({ reloadQuery }) => {
  const {
    data: allTransactions,
    isLoading: transLoading,
    refetch,
  } = useGetAllTransactionsQuery({ startDate: "", endDate:"" });

  React.useEffect(() => {
    refetch();
  }, [reloadQuery, refetch]);

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
    return <p>Loading...</p>;
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
      <div className="col-span-12 mt-6">
        <h1 className="text-center text-3xl font-bold text-text_primary tracking-normal">
          No data available
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg custom-pagination font-roboto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-roboto font-medium text-black tracking-tighter">
            Transaction Table
          </h1>
          <h1 className="text-sm font-roboto font-medium text-text_primary tracking-tighter mb-2">
            {allTransactions?.todaysTotalTransactions &&
            allTransactions.todaysTotalTransactions !== 0
              ? `${allTransactions.todaysTotalTransactions} Coupons Today`
              : "No Coupons Today"}
          </h1>
        </div>
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

export default CouponTable;

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
