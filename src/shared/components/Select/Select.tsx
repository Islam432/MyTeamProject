import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import './custom.scss'
import { Children } from 'react'

interface PropsSelect {
  label: string
  change: () => void
  children: React.ReactNode
  idInput: string
}

export default function CustomSelect({ label, children, change, idInput }: PropsSelect) {
  return (
    <FormControl>
      <InputLabel id={idInput}>{label}</InputLabel>
      <Select
        label={label}
        labelId={idInput}
        onChange={change}
      >
        {children}
      </Select>
    </FormControl>
  )
}
