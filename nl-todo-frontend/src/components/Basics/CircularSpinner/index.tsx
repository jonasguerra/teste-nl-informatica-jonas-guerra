import { CircularProgress, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export default function CircularSpinner() {
  const showSpinner = useSelector(
    (state: RootState) => state.globalSpinnerStore.showSpinner
  );

  return (
    <>
      {showSpinner && (
        <Modal open={true} sx={style.container}>
          <Box sx={style.container}>
            <CircularProgress />
          </Box>
        </Modal>
      )}
    </>
  );
}

const style = {
  container: {
    top: 0,
    left: 0,
    display: "flex",
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
};
