import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';


type Props = {
    rows: any,
    cols: any
}

const BillDetailsDatagrid = (props: Props) => {
    const { rows, cols } = props
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
      className='cob'
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
        getCellClassName={() => "bill-details-cell"}
      />
    </Box>
  )
}

export default BillDetailsDatagrid