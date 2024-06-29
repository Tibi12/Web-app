import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import InventoryDataGrid from "../Components/InventoryDatagrid";
import { useEffect, useState } from "react";
import { CreateItemDialog } from "../Components/CreateItemDialog";
import { useFetchInventory } from "../api/useFetchInventory";
import { useAddToInventoryMutation } from "../api/useAddToInventoryMutation";
import { UpdateStockDialog } from "../Components/UpdateStockDialog";
import { useUpdateStockMutation } from "../api/useUpdateStockMutation";

const Dashboard = () => {
  const navItems = [["Inventory", "active",  "/dashboard"], ["Bills", "inactive",  "/bills"], ["History", "inactive",  "/history"]];

  const { data, isSuccess, isError, error, refetch } = useFetchInventory();
  const { mutate, isSuccess: isSuccessCreate, isError: isErrorCreate, data:dataCreate, error:errorCreate } = useAddToInventoryMutation();
  const { mutate: mutateUpdateStock, isSuccess: isSuccessUpdateStock, isError: isErrorUpdateStock, data:dataUpdateStock, error:errorUpdateStock } = useUpdateStockMutation();

  useEffect(() => {
    if (isSuccessCreate) {
        console.log(dataCreate.data);
        refetch()
        handleClose()
    }

    if (isErrorCreate) {
        console.log(errorCreate)
    }
}, [isSuccessCreate, isErrorCreate, dataCreate, errorCreate]);

  useEffect(() => {
    if (isSuccessUpdateStock) {
        console.log(dataUpdateStock.data);
        refetch()
        handleCloseUpdateStock()
    }

    if (isErrorUpdateStock) {
        console.log(errorUpdateStock)
    }
}, [isSuccessUpdateStock, isErrorUpdateStock, dataUpdateStock, errorUpdateStock]);

  const [inventory, setInventory] = useState([])

  useEffect(() => {
    if (isSuccess) {
      setInventory(data);
    }

    if (isError) {
      console.log(error.response.data);
    }
  }, [isSuccess, isError, data, error]);

  const [open, setOpen] = useState(false);
  const [openUpdateStock, setOpenUpdateStock] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenUpdateStock = () => {
    setOpenUpdateStock(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseUpdateStock = () => {
    setOpenUpdateStock(false);
  };

  return (
    <>
      <AppBar component="nav" sx={{ backgroundColor: "#1f2833" }}>
        <Container maxWidth="xl">
          <Toolbar>
            <Typography
            className={"logo"}
              variant="h6"
              component="div"
              sx={{
                flexGrow: 2,
                display: { xs: "none", sm: "block" },
                color: "#66fcf1",
                fontWeight: "800",
              }}
            >
              TC TYRE WORKS
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button
                className={`${item[1]} nav-btn`}
                  key={item[0]}
                  sx={{
                    color: "#66fcf1",
                    fontWeight: 600,
                    outline: "none",
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                  href={item[2]}
                >
                  {item[0]}
                </Button>
              ))}
              <Button
                className={`nav-btn active`}
                  sx={{
                    color: "#66fcf1",
                    fontWeight: 600,
                    outline: "none",
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                  href={"/signin"}
                >
                  Logout
                </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container
        sx={{ width: "100vw", padding: "3rem !important" }}
        maxWidth="xl"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "auto",
            margin: "1rem 0rem",
          }}
        >
          <Typography variant="h5" sx={{ color: "#66fcf1", fontWeight: 600 }}>
            INVENTORY
          </Typography>
          <Box sx={{display: "flex", gap: "1rem"}}>
          <Button
            variant="outlined"
            sx={{
              color: "#66fcf1",
              fontWeight: 600,
              padding: "0.7rem 1rem",
            }}
            onClick={handleClickOpen}
          >
            ADD ITEM
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "#66fcf1",
              fontWeight: 600,
              padding: "0.7rem 1rem",
            }}
            onClick={handleClickOpenUpdateStock}
          >
            UPDATE STOCK
          </Button>
          </Box>
        </Box>
        <InventoryDataGrid rows={inventory} />
      </Container>
      <CreateItemDialog mutate={mutate} open={open} handleClose={handleClose} />
      <UpdateStockDialog mutate={mutateUpdateStock} open={openUpdateStock} handleClose={handleCloseUpdateStock} />
    </>
  );
};

export default Dashboard;
