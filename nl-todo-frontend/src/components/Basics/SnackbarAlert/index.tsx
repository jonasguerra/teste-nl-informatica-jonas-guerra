import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  AlertTitle,
  IconButton,
  Snackbar,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hideSnackbarAlert } from "../../../../store/slicers/snackbarAlert.slicer";
import { RootState } from "../../../../store/store";

export default function SnackbarAlert() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const snackbarSelector = useSelector(
    (state: RootState) => state.snackbarAlertStore.snackbarData
  );

  const handleClose = () => {
    dispatch(hideSnackbarAlert());
  };

  const renderAction = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      open={snackbarSelector.open}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert
        severity={snackbarSelector.type}
        action={renderAction}
        sx={{
          border: "solid",
          borderWidth: "0.5px",
          borderColor: theme.palette.secondary.light,
        }}
      >
        <AlertTitle>{snackbarSelector.title}</AlertTitle>
        {snackbarSelector.message}
      </Alert>
    </Snackbar>
  );
}
