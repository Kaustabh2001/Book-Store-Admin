import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./Users.scss";
import { useState } from "react";
import Add from "../../components/add/Add";
import { userRows } from "../../constants";
import { useQuery } from "@tanstack/react-query";
import { allUsers } from "../../api/users";
import Loading from "../../components/loader/loading";
// import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", /*width: 90,*/ flex:2 },
  {
    field: "Username",
    type: "string",
    headerName: "User name",
    /*width: 150,*/
    flex:1
  },
  {
    field: "Email",
    type: "string",
    headerName: "Email",
    flex:2,
  },
  {
    field: "Date",
    headerName: "Created At",
    type: "string",
    flex:1
  },
];

const Users = () => {
  const {data, isLoading, isError} = useQuery({
    queryFn: () => allUsers(),
    queryKey: ["allUsers"]
  })

  // TEST THE API

  // const { isLoading, data } = useQuery({
  //   queryKey: ["allusers"],
  //   queryFn: () =>
  //     fetch("http://localhost:8800/api/users").then(
  //       (res) => res.json()
  //     ),
  // });

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
      </div>
      { isLoading ? 
        (<Loading />):
        <DataTable slug="users" columns={columns} rows={data} />}
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="users" columns={columns} rows={data} />
      )} */}
      {/*open && <Add slug="user" columns={columns} setOpen={setOpen} />*/}
    </div>
  );
};

export default Users;
