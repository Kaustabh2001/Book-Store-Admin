import { useState } from "react";
import "./Products.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { products } from "../../constants";
import { useQuery } from "@tanstack/react-query";
import { allBooks } from "../../api/books";
import Loading from "../../components/loader/loading";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import Tooltip from '@mui/material/Tooltip'



const columns: GridColDef[] = [
  { field: "ISBN", headerName: "ID", flex:1 },
  {
    field: "Cover_Image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.Cover_Image || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "Name",
    type: "string",
    headerName: "Title",
    flex:2,
  },
  {
    field: "Author",
    type: "string",
    headerName: "Author",
    flex:1,
  },
  {
    field: "Publisher",
    headerName: "Publisher",
    flex:1,
    type: "string",
  },
  {
    field: "Purchase_Cost",
    type: "string",
    headerName: "Cost Price",
    flex: 0.5,
  },
  {
    field: "Selling_cost",
    headerName: "Selling Price",
    type: "string",
    flex: 0.5,
  },
  {
    field: "Available_pieces",
    headerName: "In Stock",
    flex: 0.5,
    type: "number",
  }
];

const inputfields = [
  { field: "ISBN", headerName: "ISBN", type: "number" },
  {
    field: "Image Link",
    headerName: "Cover Image",
    type: "string"
  },
  {
    field: "Name of the Book",
    type: "string",
    headerName: "Title",
  },
  {
    field: "Author of the Book",
    type: "string",
    headerName: "Author",
  },
  {
    field: "Publisher of the Book",
    headerName: "Publisher",
    flex:1,
    type: "string",
  },
  {
    field: "Purchase Cost",
    type: "string",
    headerName: "Cost Price",
  },
  {
    field: "Selling Cost",
    headerName: "Selling Price",
    type: "string",
  },
  {
    field: "Available_pieces",
    headerName: "In Stock",
    type: "number",
  },
  {
    field: "Year of Publication",
    headerName: "Year of Publication",
    type: "number"
  },
  {
    field: "Genre",
    headerName: "Genre",
    type: "string"
  }
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const {data, isLoading, isError} = useQuery({
    queryFn: () => allBooks(),
    queryKey: ["allBooks"]
  });

  // TEST THE API

  // const { isLoading, data } = useQuery({
  //   queryKey: ["allproducts"],
  //   queryFn: () =>
  //     fetch("http://localhost:8800/api/products").then(
  //       (res) => res.json()
  //     ),
  // });

  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <Tooltip title="Add New Product" placement="top">
          <AddCircleOutlinedIcon sx={{"cursor":"pointer"}} fontSize="large" onClick={() => setOpen(true)}/>
        </Tooltip>  
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <DataTable slug="products" columns={columns} rows={data} />
      )}
      {open && <Add slug="product" columns={inputfields} setOpen={setOpen} />}
    </div>
  );
};

export default Products;
