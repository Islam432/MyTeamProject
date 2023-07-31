import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import './style.module .scss'

interface ModalProps {
  title?: string
  desc?: string
  isOpen: boolean
  children: React.ReactNode
  btn?: React.ReactNode
  onClose: () => void
  submit?: () => void
}

export default function Modal({ title, desc, isOpen, children, btn, onClose, submit }: ModalProps) {
  return (
    <Dialog
      sx={{ backgroundColor: '#0000002f !important' }}
      open={isOpen}
      onClose={onClose}
    >
      <form onSubmit={submit}>
        <DialogTitle sx={{ textAlign: 'center' }}>{title}</DialogTitle>
        <DialogContent sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <DialogContentText>{desc}</DialogContentText>
          {children}
        </DialogContent>
        <DialogActions sx={{ display: 'flex', gap: '10px' }}>{btn}</DialogActions>
      </form>
    </Dialog>
  )
}
