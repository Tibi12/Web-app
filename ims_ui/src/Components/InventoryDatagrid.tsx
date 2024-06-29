import { Box } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid';


type Props = {
    rows: any
}

const InventoryDataGrid = (props: Props) => {
    const { rows } = props
    const cols: GridColDef<(typeof rows)[number]>[] = [
      { field: "id", headerName: "ID", width: 90 },
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
        field: "stock",
        headerName: "Stock",
        flex: 1,
      },
      {
        field: "price",
        headerName: "Price",
        flex: 1,
      }
    ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={cols}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
            width: "100%",
        }}
      />
    </Box>
  )
}

export default InventoryDataGrid