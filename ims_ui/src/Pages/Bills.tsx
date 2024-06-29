import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  Container,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useFetchInventory } from "../api/useFetchInventory";
import { useGenerateBillMutation } from "../api/useGenerateBillMutation";
import BillsDatagrid from "../Components/BillsDatagrid";

const Bills = () => {
  const navItems = [
    ["Inventory", "inactive", "/dashboard"],
    ["Bills", "active", "/bills"],
    ["History", "inactive", "/history"],
  ];

  const [billData, setBillData] = useState<any>([]);
  const [inventoryData, setInventoryData] = useState([]);
  const { data, isSuccess, isError, error } = useFetchInventory();
  useEffect(() => {
    if (isSuccess) {
      setInventoryData(data);
    }

    if (isError) {
      console.log(error.response.data);
    }
  }, [isSuccess, isError, data, error]);
  useEffect(() => {
    let sum = 0;
    for (const item of billData) {
      sum = sum + item.quantity * item.price;
    }
    setTotalBillAmount(sum);
  }, [billData]);

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [totalBillAmount, setTotalBillAmount] = useState(0);
  const [client, setClientName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  const handleOptionChange = (event: any, option: any) => {
    console.log(event)
    option.quantity = 1;
    setSelectedItem(option);
  };

  const handleClearItems = () => {
    setClientName("");
    setMobile("");
    setAddress("");
    setAddress("");
    setTotalBillAmount(0);
    setBillData([]);
  };

  const {
    mutate,
    isSuccess: isSuccessGenerateBill,
    isError: isErrorGenerateBill,
    data: dataGenerateBill,
    error: errorGenerateBill,
  } = useGenerateBillMutation();

  useEffect(() => {
    if (isSuccessGenerateBill) {
      console.log(dataGenerateBill.data);
      handleClearItems()
    }

    if (isErrorGenerateBill) {
      console.log(errorGenerateBill);
    }
  }, [
    isSuccessGenerateBill,
    isErrorGenerateBill,
    dataGenerateBill,
    errorGenerateBill,
  ]);

  const handleGenerateBill = () => {
    mutate({
      client,
      mobile,
      address,
      items: billData,
    })
  };

  const handleAddItemToBill = () => {
    if (selectedItem != null) {
      const index = billData.findIndex(
        (item: any) => item.id === selectedItem.id
      );
      if (index != -1) {
        setBillData((prevData: any) => {
          const updatedData = [...prevData];
          updatedData[index].quantity += 1;
          return updatedData;
        });
      } else {
        setBillData([...billData, selectedItem]);
      }
    }
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
        sx={{ width: "100vw", padding: "5rem 3rem !important" }}
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
            BILLS
          </Typography>
        </Box>
        <Box>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Box sx={{ flex: 1 }}>
              <TextField
                onChange={(event) => {
                  setClientName(event.target.value);
                }}
                className="bills-input"
                variant="outlined"
                margin="normal"
                required
                value={client}
                fullWidth
                id="clientNameBills"
                label="Client Name"
                name="client"
                autoFocus
                sx={{
                  "& label": {
                    color: "white",
                  },
                  "& label.Mui-focused": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
              />
              <TextField
                onChange={(event) => {
                  setMobile(event.target.value);
                }}
                className="bills-input"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="mobileBills"
                label="Mobile"
                name="mobile"
                value={mobile}
                sx={{
                  color: "white",
                  "& label": {
                    color: "white",
                  },
                  "& label.Mui-focused": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
              />
            </Box>
            <Box sx={{ flex: 2 }}>
              <TextField
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
                className="bills-input"
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
                required
                value={address}
                fullWidth
                id="addressBills"
                label="Address"
                name="address"
                sx={{
                  "& label": {
                    color: "white",
                  },
                  "& label.Mui-focused": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", marginTop: "0.3rem", gap: "10px" }}>
            <Autocomplete
              disablePortal
              id="search-box"
              options={inventoryData}
              fullWidth
              className="custom-search"
              sx={{
                "& label": {
                  color: "white",
                },
                "& label.Mui-focused": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
              renderInput={(params: any) => (
                <TextField {...params} label="Item" />
              )}
              getOptionLabel={(option: any) => {
                return option.brand;
              }}
              onChange={handleOptionChange}
            />

            <Button
              onClick={handleAddItemToBill}
              className="nav-item active"
              sx={{
                color: "#66fcf1",
                fontWeight: 600,
                outline: "none",
                "&:focus": {
                  outline: "none",
                },
                width: "10%",
              }}
            >
              Add item
            </Button>
          </Box>

          <Box sx={{ marginTop: "1rem" }}>
            <BillsDatagrid rows={billData} />
          </Box>
          <Box sx={{ display: "flex", marginTop: "1rem", gap: "10px" }}>
            <Box
              sx={{
                flex: 1,
                border: "1px solid white",
                borderRadius: "4px",
                padding: "1rem",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              <Typography sx={{ fontSize: "1.1rem", fontWeight: "600" }}>
                Grand Total :{" "}
              </Typography>
              <Typography sx={{ fontSize: "1.1rem", fontWeight: "600" }}>
              ₹&nbsp;{totalBillAmount}
              </Typography>
            </Box>

            <Button
              className="active"
              sx={{
                color: "#66fcf1",
                fontWeight: 600,
                outline: "none",
                "&:focus": {
                  outline: "none",
                },
                width: "20%",
              }}
              onClick={handleClearItems}
            >
              Clear items
            </Button>
            <Button
              className="active"
              sx={{
                color: "#66fcf1",
                fontWeight: 600,
                outline: "none",
                "&:focus": {
                  outline: "none",
                },
                width: "20%",
              }}
              onClick={handleGenerateBill}
            >
              Generate Bill
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Bills;
