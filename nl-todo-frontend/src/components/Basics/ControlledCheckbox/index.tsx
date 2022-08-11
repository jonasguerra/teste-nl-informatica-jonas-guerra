import { Checkbox, CheckboxProps, Typography } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { CheckboxContainer } from './styles';

interface Props extends CheckboxProps {
  name: string;
  control: Control<any, any>;
  label?: string;
  defaultChecked?: boolean;
  className?: string;
}

export default function ControlledCheckbox({ name, control, label, className, defaultChecked = true, ...rest }: Props) {
  const _renderInput = (onChange, value, name, onBlur, ref) => {
    return (
      <CheckboxContainer>
        <Checkbox checked={value} onChange={onChange} onBlur={onBlur} name={name} ref={ref} {...rest} />
        <Typography overflow="hidden">{label}</Typography>
      </CheckboxContainer>
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultChecked}
      render={({ field: { onChange, value, name, onBlur, ref } }) => _renderInput(onChange, value, name, onBlur, ref)}
    />
  );
}
