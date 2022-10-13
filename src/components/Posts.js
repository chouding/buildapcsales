import { DataGrid } from '@mui/x-data-grid'
import { Link } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

const Posts = ({ searchInput, newPosts }) => {
  const columns = [
    { field: 'col1', headerName: 'Product Type', flex: 0.1 },
    { field: 'col2', headerName: 'Product Name',  flex: 0.6},
    { field: 'col3', headerName: 'Product URL', 
      renderCell: (params) => {
        const url = params.value
        return (
          <Link href={url} target='_blank' rel='noreferrer' underline='always'>Link</Link>
        )
      },
      flex: 0.1 },
    { field: 'col4', headerName: 'Date Posted', flex: 0.1 },
    { field: 'col5', headerName: 'Ongoing?',
      renderCell: (params) => {
        const isOngoing = params.value
        if (isOngoing) {
          return (
            <CheckIcon color='success' />
          )
        }
        return (
          <CloseIcon color='error' />
        )
      },
      flex: 0.1 },
  ]

  const filteredPostObjects = newPosts.filter(post => post.name.toLowerCase().includes(searchInput))
  const rows = filteredPostObjects.map(post => (
    { id: String(post.date), col1: post.type, col2: post.name, col3: post.url, col4: post.date, col5: post.ongoing }
  ))

  return (
    <div style={{ flexGrow: 1, width: '100%' }}>
      <DataGrid 
        pageSize={25}
        rows={rows} 
        getRowHeight={() => 'auto'} 
        rowsPerPageOptions={[25]}
        columns={columns} 
        pagination
        autoHeight
      />
    </div>
  )
}

export default Posts