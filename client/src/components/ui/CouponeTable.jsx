import * as React from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const columns = [
  "SL.No.",
  "Member ID",
  "Coupone Type",
  "Cash",
  "Timestamp",
  {
    name: "Status",
    options: {
      customBodyRender: (value) => (
        <p
          className={`capitalize px-3 py-1 ${
            value === "Paid"
              ? "text-secondary bg-text_tertiaary"
              : "text-tettiary bg-text_quaternary"
          } rounded-full inline-block`}
        >
          {value}
        </p>
      ),
    },
  },
];

const CouponeTable = () => {
  const data = [
    ["1", "BEC20240201DEMO1", "ISSUE", "1000", "10:30", "Paid"],
    ["2", "BEC20240201DEMO1", "RECEIVE", "1000", "10:30", "Due"],
    ["3", "BEC20240201DEMO1", "ISSUE", "1000", "10:30", "Paid"],
    ["4", "BEC20240201DEMO1", "RECEIVE", "1000", "10:30", "Due"],
  ];

  const options = {
    selectableRows: false,
    elevation: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10],
    search: false,
    filter: false,
    print: false,
    download: false,
  };
  const getMuiTheme = () =>
    createTheme({
      typography: {
        fontFamily: "Roboto,sans-serif",
      },
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: { padding: "10px 0px", borderBottom: "none" },
            body: { padding: "7px 15px", borderBottom: "none" },
          },
        },
      },
    });

  return (
    <>
      <div className="px-4 bg-white rounded-2xl shadow-table_shadow">
        <div className="">
          <ThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={"Issue Coupone Table"}
              data={data}
              columns={columns}
              options={options}
            />
          </ThemeProvider>
        </div>
      </div>
    </>
  );
};

export default CouponeTable;
