import { Box } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid';


type Props = {
    rows: any,
    handleOnRowClick: any
}

const HistoryDatagrid = (props: Props) => {
    const { rows, handleOnRowClick } = props

    const cols: GridColDef<any>[] = [
      { field: "id", headerName: "ID", width: 90 },
      {
        field: "client",
        headerName: "Client Name",
        flex: 1,
      },
      {
        field: "mobile",
        headerName: "Mobile",
        flex: 1,
      },
      {
        field: "address",
        headerName: "Address",
        flex: 1,
      },
      {
        field: "total",
        headerName: "Amount",
        flex: 1,
      },
      {
        field: "count",
        headerName: "Items",
        flex: 1,
      },
    ];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={cols}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
            width: "100%",
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#025953 !important',
              cursor: "pointer"
            }
        }}
        onRowClick={handleOnRowClick}
      />
    </Box>
  )
}

export default HistoryDatagrid