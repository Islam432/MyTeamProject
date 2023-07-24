import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 15 },
  { id: 6, lastName: 'Melisandre', firstName: 'random', age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 10, lastName: 'Man', firstName: 'Ran', age: 67 },
  { id: 11, lastName: 'Roxie', firstName: 'Hbo', age: 64 },
  { id: 12, lastName: 'Roxie', firstName: 'garry', age: 22 },
  { id: 13, lastName: 'Roxie', firstName: 'bob', age: 41 },
  { id: 14, lastName: 'Roxie', firstName: 'qwentyn', age: 12 },
  { id: 15, lastName: 'Roxie', firstName: 'fill', age: 51 },
  { id: 16, lastName: 'Roxie', firstName: 'loren', age: 23 },


  
];

export default function DataGridDemo() {
  return (
    < >
      <h1>Classes</h1>
      <div style={{ width: '100%', padding: '1rem 0' }}>

      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 25 },
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      </div>
    </>
  );
}
