import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface Props {
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DialogWithActions({
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Dialog open={true} onClose={onCancel} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      {message && <DialogContent>{message}</DialogContent>}
      <DialogActions>
        <Button variant="contained" onClick={onConfirm}>
          {confirmText}
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          {cancelText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
