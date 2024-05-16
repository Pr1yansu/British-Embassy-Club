import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FaRegArrowAltCircleDown } from "react-icons/fa";

const columns = [
  { field: "id", headerName: "SL.No.", width: 70 },
  { field: "member_id", headerName: "Member ID", width: 200 },
  { field: "coupone", headerName: "Coupone Type", width: 130 },
  { field: "cash", headerName: "Cash", type: "number", width: 130 },
  { field: "time", headerName: "Time Stamp", width: 130 },
  { field: "status", headerName: "Status", width: 130 },
];

const rows = [
  {
    id: 1,
    member_id: "BEC20240201DEMO1",
    coupone: "ISSUE",
    cash: 1000,
    time: "10:00 am",
    status: "",
  },
  {
    id: 2,
    member_id: "BEC20240201DEMO1",
    coupone: "ISSUE",
    cash: 1000,
    time: "10:00 am",
    status: "",
  },
];

export default function DataTable() {
  return (
    <div className="shadow-table_shadow p-9 rounded-3xl bg-white">
      <div className="flex justify-between items-center my-4 ">
        <div className="">
          <h4 className="">Issue Coupone Table</h4>
          <p className="text-text_primary">100 coupones today</p>
        </div>

        <div className="cursor-pointer flex gap-2">
          <FaRegArrowAltCircleDown size={15} />
          <p>Report</p>
        </div>
      </div>
      <div className=" " style={{ height: 350, width: "100%" }}>
        <DataGrid
          className=""
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
        />
      </div>
    </div>
  );
}
