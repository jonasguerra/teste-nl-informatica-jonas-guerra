import { BaseTextFieldProps, TextField } from "@mui/material";
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
  variant = "outlined",
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
  const _renderInput = (field: any) => {
    return (
      <>
        <TextField
          {...field}
          {...rest}
          variant={variant}
          fullWidth
          color={color}
          required={required}
          error={!!errorMessage}
          helperText={errorMessage ? errorMessage : helperText}
          type={type}
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
