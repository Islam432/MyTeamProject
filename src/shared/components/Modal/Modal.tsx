import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

interface ModalProps {
  title: string
  desc: string
  isOpen: boolean
  children: React.ReactNode
  btn?: React.ReactNode
  onClose: () => void
}

export default function Modal({ title, desc, isOpen, children, btn, onClose }: ModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <DialogContentText>{desc}</DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>{btn}</DialogActions>
    </Dialog>
  )
}
