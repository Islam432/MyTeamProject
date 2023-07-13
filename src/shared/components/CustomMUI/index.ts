import { TextField, styled } from '@mui/material'

export const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#fc0',
    zIndex: '9',
  },
  'input[type="text"]': {
    border: 'none',
  },
  '& input': {
    zIndex: '1',
    color: '#333',
    borderColor: '333',
    padding: '15px',
  },
  '& label': {
    color: '#333',
    zIndex: '999999',
  },
  '& .MuiInput-underline:after': {
    color: '#333',
    borderBottomColor: '#fff',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#333',
      color: '#333',
    },
    '&:hover fieldset': {
      color: '#333',
      borderColor: '#333',
    },
    '&.Mui-focused fieldset': {
      color: '#333',
      borderColor: '#333',
    },
  },
})
