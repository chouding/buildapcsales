import ComputerIcon from '@mui/icons-material/Computer'
import SearchIcon from '@mui/icons-material/Search' 
import InputBase from '@mui/material/InputBase'
import { Typography, AppBar } from '@mui/material'


const TitleBar = ( { Label, StyledSearchbar, StyledToolbar, searchInput, setSearchInput } ) => {
  return (
    <AppBar position='sticky'>
      <StyledToolbar sx={{ backgroundColor: '#3091E1' }}>
        <Label>
          <ComputerIcon sx={{ mr: '0.5rem', color: 'black', fontSize: '2.4rem' }} />
          <Typography sx={{ 
            display: {  xs: 'none', sm: 'block' },  
            fontSize: '1.5rem'
            }}>
              r/buildapcsales
          </Typography>
        </Label>
        <StyledSearchbar>
          <SearchIcon sx={{ color:'black' }} />
          <InputBase 
            sx={{ width: '100%' }} 
            placeholder='Search...' 
            value={searchInput}
            variant='outlined'
            onChange={(event) => {
              setSearchInput(event.target.value)
            }}
          />
        </StyledSearchbar>
      </StyledToolbar>
    </AppBar>
  )
}

export default TitleBar