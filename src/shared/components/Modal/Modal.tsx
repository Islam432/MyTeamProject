import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useState } from 'react'

interface ModalProps {
  title: string
  desc: string
  isOpen: boolean
  children: React.ReactNode
  btn: React.ReactNode
}

export default function Modal({ title, desc, isOpen, children, btn }: ModalProps) {
  const [open, setOpen] = useState<boolean>(isOpen)
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <DialogContentText>{desc}</DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>{btn}</DialogActions>
    </Dialog>
  )
}
