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
  Autocomplete,
  TextField,
} from "@mui/material";
import { useFetchInventory } from "../api/useFetchInventory";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const UpdateStockDialog = (props: any) => {
  const { open, handleClose } = props;
  const [stock, setStock] = React.useState(0);
  const [inventoryData, setInventoryData] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState<any>(null);

  const { data, isSuccess, isError, error } = useFetchInventory();

  React.useEffect(() => {
    if (isSuccess) {
      setInventoryData(data);
    }

    if (isError) {
      console.log(error.response.data);
    }
  }, [isSuccess, isError, data, error]);

  React.useEffect(() => {
      console.log(selectedItem);
  }, [selectedItem]);

  const handleOptionChange = (event: any, option: any) => {
    console.log(event)
    option.quantity = 1;
    setSelectedItem(option);
  };

  const handleSubmit = () => {
    // props.mutate({ brand, model, size, stock, price });
    props.mutate({
      id: selectedItem.id, stock
    })
  }
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Update stock
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
        <DialogContent dividers sx={{width: "500px"}}>
          <form className="form" noValidate>
          <Autocomplete
              disablePortal
              options={inventoryData}
              fullWidth
              renderInput={(params: any) => (
                <TextField {...params} label="Item" />
              )}
              getOptionLabel={(option: any) => {
                return option.brand;
              }}
              onChange={handleOptionChange}
            />
            <TextField
              onChange={(event) => {
                setStock(event.target.value as any);
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
            UPDATE
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};
