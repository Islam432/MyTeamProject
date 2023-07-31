import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import './custom.scss'
import { Children } from 'react'

interface PropsSelect {
  label: string
<<<<<<< HEAD
  change: () => void
=======
>>>>>>> origin/feature/lms-16
  children: React.ReactNode
  id: string
}

export default function CustomSelect(props: PropsSelect) {
  return (
    <FormControl>
      <InputLabel id={props.id}>{props.label}</InputLabel>
      <Select
        labelId={props.id}
        {...props}
      >
        {props.children}
      </Select>
    </FormControl>
  )
}
