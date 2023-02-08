import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

interface AlertDialogProps {
  isOpen: boolean;
  text: string;
  cancelFunc?: () => void;
  okFunc?: () => void;
}

export function AlertDialog({
  isOpen,
  text,
  cancelFunc,
  okFunc,
}: AlertDialogProps) {
  const handleCloseOk = () => {
    okFunc && okFunc();
  };

  const handleCloseCancel = () => {
    cancelFunc && cancelFunc();
  };

  return (
      <Dialog
        open={isOpen}
        onClose={handleCloseCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{text}</DialogTitle>
        <DialogActions>
          {cancelFunc && (
            <Button onClick={handleCloseCancel}>
              Cancel
            </Button>
          )}
          {okFunc && (
            <Button onClick={handleCloseOk}>
              Ok
            </Button>
          )}
        </DialogActions>
      </Dialog>
  );
}
