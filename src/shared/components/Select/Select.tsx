import { FormControl, InputLabel, Select } from '@mui/material'
import './custom.scss'

interface PropsSelect {
  label: string
  children: React.ReactNode
  id: string
  error?: boolean
  helperText?: string
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
