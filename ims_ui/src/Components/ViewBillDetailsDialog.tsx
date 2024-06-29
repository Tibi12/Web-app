import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import BillDetailsDatagrid from "./BillDetailsDatagrid";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const ViewBillDetailsDialog = (props: any) => {
  const { open, handleClose, rows } = props;

  React.useEffect(() => {
    console.log(rows)
  }, [rows])
  
  
  const cols: any = [
    {
      field: "brand",
      headerName: "Brand",
      flex: 1,
    },
    {
      field: "model",
      headerName: "Model",
      flex: 1,
    },
    {
      field: "size",
      headerName: "Size",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
    }
  ];

 
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="lg"
        
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Bill Details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{width: "900px"}}> 
        <BillDetailsDatagrid cols={cols} rows={rows} />
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
};
