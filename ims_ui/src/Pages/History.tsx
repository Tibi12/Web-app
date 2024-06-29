import {
  AppBar,
  Box,
  Button,
  Container,
  Skeleton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import HistoryDatagrid from "../Components/HistoryDatagrid";
import { ViewBillDetailsDialog } from "../Components/ViewBillDetailsDialog";
import { useFetchBills } from "../api/useFetchBills";

type BillItemType = {
  id: string | number;
  inventoryItem: {
    id: string;
    brand: string;
    model: string;
    size: string;
    price: string;
  };
  quantity: number | string;
  amount: string;
};
export type BillsDataType = {
  id: string | number;
  client: string;
  mobile: string;
  address: string;
  total: string | number;
  count: string | number;
  billItems: BillItemType[];
};
const History = () => {
  const { data, isSuccess, isError, error } = useFetchBills();

  useEffect(() => {
    if (isSuccess) {
      setBillsData(data);
    }

    if (isError) {
      console.log(error.response.data);
    }
  }, [isSuccess, isError, data, error]);

  

  const navItems = [
    ["Inventory", "inactive", "/dashboard"],
    ["Bills", "inactive", "/bills"],
    ["History", "active", "/history"],
  ];
  const [billData, setBillsData] = useState<BillsDataType[]>([]);
  const [billDetails, setBillsDetails] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("flag", billData)
  }, [billData]);
  
  const handleOnRowClick = ({ row }: any) => {
    handleClickOpen();
    console.log(row.billItems)
    setBillsDetails(row.billItems);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
            HISTORY
          </Typography>
        </Box>
        {isSuccess ? (
          <HistoryDatagrid
            handleOnRowClick={handleOnRowClick}
            rows={billData}
          />
        ) : (
          <Box sx={{ width: "100%" }}>
            <Skeleton sx={{ bgcolor: "#1c1c1c", height: "3rem" }} />
            <Skeleton sx={{ bgcolor: "#1c1c1c", height: "3rem" }} />
            <Skeleton sx={{ bgcolor: "#1c1c1c", height: "3rem" }} />
            <Skeleton sx={{ bgcolor: "#1c1c1c", height: "3rem" }} />
            <Skeleton sx={{ bgcolor: "#1c1c1c", height: "3rem" }} />
            <Skeleton sx={{ bgcolor: "#1c1c1c", height: "3rem" }} />
            <Skeleton sx={{ bgcolor: "#1c1c1c", height: "3rem" }} /> 
          </Box>
        )}
      </Container>
      <ViewBillDetailsDialog open={open} handleClose={handleClose} rows={billDetails} />
    </>
  );
};

export default History;
