import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import React, { useState } from "react";
import { CustomDialogActions } from "../../../global/styles/styles";
import DefaultButton from "../DefaultButton";
import { CardWrapper, DefaultLink, InfoWrapper } from "./styles";

interface Props {
  title: string;
  hint?: string;
  hintDetails?: string;
}

export default function NoExistingData(props: Props) {
  const [showHintDialog, setShowHintDialog] = useState<boolean>(false);

  const handleHintClick = () => {
    setShowHintDialog(true);
  };

  const handleHintClose = () => {
    setShowHintDialog(false);
  };

  return (
    <CardWrapper>
      <Typography variant="h6" sx={{ pb: 1 }}>
        {props.title}
      </Typography>
      {props.hint && (
        <InfoWrapper>
          <HelpOutlineIcon color="primary" />
          <DefaultLink onClick={handleHintClick}>{props.hint}</DefaultLink>
        </InfoWrapper>
      )}
      {showHintDialog && (
        <Dialog open={showHintDialog} onClose={handleHintClose}>
          <DialogTitle>More information</DialogTitle>
          <DialogContent>{props.hintDetails}</DialogContent>
          <CustomDialogActions>
            <DefaultButton onClick={handleHintClose} title="Close" />
          </CustomDialogActions>
        </Dialog>
      )}
    </CardWrapper>
  );
}
