import { TextField, styled } from '@mui/material'

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


