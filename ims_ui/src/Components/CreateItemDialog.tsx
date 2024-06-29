import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  TextField,
} from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const CreateItemDialog = (props: any) => {
  const { open, handleClose } = props;
  const [brand, setBrand] = React.useState("");
  const [model, setModel] = React.useState("");
  const [size, setSize] = React.useState("");
  const [stock, setStock] = React.useState("");
  const [price, setPrice] = React.useState("");

  const handleSubmit = () => {
    console.log(brand, model, size, stock, price)
    props.mutate({ brand, model, size, stock, price });
  }
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create Inventory Item
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
        <DialogContent dividers>
          <form className="form" noValidate>
            <TextField
              onChange={(event) => {
                setBrand(event.target.value);
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="brand"
              label="Brand"
              name="brand"
            />
            <TextField
              onChange={(event) => {
                setModel(event.target.value);
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="model"
              label="Model"
              id="model"
            />
            <TextField
              onChange={(event) => {
                setSize(event.target.value);
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="size"
              label="Size"
              id="size"
            />
            <TextField
              onChange={(event) => {
                setStock(event.target.value);
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="stock"
              label="Stock"
              type="number"
              id="stock"
            />
            <TextField
              onChange={(event) => {
                setPrice(event.target.value);
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="price"
              label="Price"
              type="number"
              id="price"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
            onClick={() => {
              handleSubmit();
            }}
            sx={{ marginTop: "2rem", backgroundColor: "#1f2833", p: 2 }}
          >
            CREATE
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};
