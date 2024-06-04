import React from "react";
import DataTable from "react-data-table-component";
import { useGetAllTransactionsQuery } from "../../store/api/walletAPI";

const CouponTable = ({ walletdata, reloadQuery }) => {
  const [count, setCount] = React.useState(0);
  const {
    data: allTransactions,
    isLoading: transLoading,
    isError,
    refetch,
  } = useGetAllTransactionsQuery();

  React.useEffect(() => {
    refetch();
  }, [reloadQuery, refetch]);

  const formattedData = React.useMemo(
    () =>
      allTransactions?.data?.map((transaction, index) => ({
        SLNO: index + 1,
        MEMBERID: transaction.memberId._id,
        COUPONTYPE: transaction.type,
        COUPONAMOUNT: transaction.couponId.amount,
        PAYAMOUNT: transaction.payableAmount,
        TIMESTAMP: new Date(transaction.timeStamp).toLocaleTimeString(),
        STATUS: transaction.status.toUpperCase(),
      })) || [],
    [allTransactions]
  );

  if (transLoading) {
    return <p>Loading...</p>;
  }

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
      <h1 className="text-2xl font-roboto font-medium text-black tracking-tighter">
        Issue Coupons Table
      </h1>
      <h1 className="text-sm font-roboto font-medium text-text_primary tracking-tighter mb-2">
        {count} Coupons Today
      </h1>
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
    name: "Coupon Type",
    selector: (row) => row.COUPONTYPE,
    // sortable: true,
  },
  {
    name: "Coupon Amount",
    selector: (row) => row.COUPONAMOUNT,
    // sortable: true,
  },
  {
    name: "Pay Amount",
    selector: (row) => row.PAYAMOUNT,
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
