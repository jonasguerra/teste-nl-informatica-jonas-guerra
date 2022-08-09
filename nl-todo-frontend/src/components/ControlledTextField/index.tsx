import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  BaseTextFieldProps,
  IconButton,
  Popover,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";

interface Props extends BaseTextFieldProps {
  control: Control<any>;
  name: string;
  defaultValue?: string;
  type?: string;
  variant?: "outlined" | "standard" | "filled";
  errorMessage?: string;
  required?: boolean;
  showHelperAdornment?: boolean;
  helperText?: string;
  helperAction?: () => void;
  hidden?: boolean;
}

export default function ControlledTextField({
  control,
  name,
  defaultValue,
  variant,
  errorMessage,
  color = "primary",
  type = "text",
  required = false,
  showHelperAdornment = false,
  helperAction,
  helperText,
  hidden,
  ...rest
}: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const _renderInput = (field) => {
    return (
      <>
        {/*use a fake input is the only way to disable chrome autocomplete*/}
        {type == "password" && (
          <input
            type="password"
            name="fake-password"
            autoComplete="new-password"
            style={fakeInputStyle}
            hidden
          />
        )}
        <TextField
          {...field}
          {...rest}
          variant={variant}
          fullWidth
          color={color}
          required={required}
          size={size}
          error={!!errorMessage}
          helperText={errorMessage ? errorMessage : helperText}
          autoComplete={autoComplete}
          type={type}
          InputProps={{
            endAdornment: showHelperAdornment && (
              <>
                <Tooltip title="Click here for help">
                  <IconButton
                    color="secondary"
                    onClick={(event) => handleClick(event)}
                    size="small"
                  >
                    <HelpOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  sx={{
                    maxWidth: "75%",
                  }}
                >
                  <Typography sx={{ p: 2 }}>
                    {helperText}
                    {helperAction && (
                      <a
                        href="#"
                        color="primary"
                        onClick={() => helperAction()}
                      >
                        here
                      </a>
                    )}
                  </Typography>
                </Popover>
              </>
            ),
          }}
        />
      </>
    );
  };

  return (
    <>
      {control && name && (
        <Controller
          defaultValue={defaultValue ? defaultValue : ""}
          control={control}
          name={name}
          render={({ field }) => _renderInput(field)}
        />
      )}
    </>
  );
}

const fakeInputStyle = { opacity: 0, border: "none", height: 0, width: 0 };
