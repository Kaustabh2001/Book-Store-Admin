import {
  DataGrid,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../api/books";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#72a5f7',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  //display: "flex",
  //justify-content: "space-between"
};



type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
};

const DataTable = (props: Props) => {

  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState<string>('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id:string) => deleteProduct(id),
    onSuccess: ()=>{
      queryClient.invalidateQueries([`allBooks`]);
    }
  });

  const handleDeleteButton = (id: string) => {
    handleOpen();
    setId(id);
  }

  const handleDelete = () => {
    console.log(id)
    handleClose();
    mutation.mutate(id);
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={`/${props.slug}/${params.row._id}`}>
            <img src="/view.svg" alt="" />
          </Link>
          {props.slug === 'users' ? <></> : <div className="delete" onClick={() => handleDeleteButton(params.row._id)}>
            <img src="/delete.svg" alt="" />
          </div>}
        </div>
      );
    },
  };

  return (
    
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 50,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
      <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{padding:"10px"}}>
            Do you really want to delete this book ?
          </Typography>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Button color="primary" variant="contained" onClick={handleDelete}>
              Yes
            </Button>
            <Button color="primary" variant="contained" onClick={handleClose}>
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
    </div>
    
  );
};

export default DataTable;
