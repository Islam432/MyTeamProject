import { Button, Fab, Select, TextField, styled } from '@mui/material'

export const CssTextField = styled(TextField)(({ theme }) => ({
  '& label.Mui-focused': {
    color: '#fc0',
    zIndex: '9',
  },
  'input[type="text"]': {
    border: 'none',
  },
  '& input': {
    zIndex: '1',
    color: '#666',
    transition: '.5s all',
    borderColor: '#ccc',
  },
  '& label': {
    color: '#666',
    zIndex: '999999',
  },
  '& .MuiInput-underline:after': {
    color: '#fc0',
    borderBottomColor: '#fff',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ccc',
      color: '#ccc',
    },
    '&:hover fieldset': {
      color: '#ccc',
      borderColor: '#333',
    },
    '&.Mui-focused fieldset': {
      color: '#ccc',
      boxShadow: '2px 4px 24px 2px rgba(34, 41, 47, 0.1)',
      borderColor: '#fc0',
    },
  },
}))

export const CssButton = styled(Button)(({ theme }) => ({
  '&&': {
    background: '#fc0',
    color: '#fff',
    padding: '12px',
    margin: '0',
    fontSize: '16px',
    textTransform: 'none',
  },
}))

export const CssFab = styled(Fab)(({ theme }) => ({
  '&': {
    background: '#fc0',
    color: '#fff',
  },
  '&:hover': {
    background: '#fd0',
  },
}))
