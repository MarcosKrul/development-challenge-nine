import React from 'react';
import { IconButton, TextFieldProps } from '@mui/material';
import {
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import { CustomTextField } from './styles';
import CloseIcon from '@mui/icons-material/Close';

type InputErrorProps = {
  message: string;
  value: boolean;
};

type CustomInputProps = {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string | number;
  type?: string;
  mask?: (value: string) => string;
  maxLength?: number;
  endFunction?: string;
  rules?: Omit<
    RegisterOptions<FieldValues, FieldPath<FieldValues>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
} & TextFieldProps;

const CustomInput = ({
  name,
  label,
  required,
  disabled,
  defaultValue,
  type = 'text',
  mask,
  maxLength,
  rules,
  endFunction,
  autoComplete,
  ...rest
}: CustomInputProps): JSX.Element => {
  const { control, formState, getFieldState } = useFormContext();

  const getError = (): InputErrorProps => {
    const fieldState = getFieldState(name, formState);

    if (fieldState.error && fieldState.error.message)
      return {
        value: true,
        message: fieldState.error.message,
      };
    return {
      value: false,
      message: '',
    };
  };

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      rules={rules}
      render={({ field: { value, onChange } }) => (
        <CustomTextField
          {...rest}
          autoComplete={autoComplete || 'off'}
          onChange={(
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            onChange(mask ? mask(event.target.value) : event.target.value);
          }}
          value={mask ? mask(value || '') : value || ''}
          required={required}
          disabled={disabled}
          label={label}
          type={type}
          InputProps={{
            endAdornment: endFunction === 'clear' && (
              <IconButton onClick={() => onChange('')}>
                <CloseIcon />
              </IconButton>
            ),
          }}
          inputProps={{ maxLength: maxLength }}
          helperText={getError().message}
          error={getError().value}
        />
      )}
    />
  );
};

export { CustomInput };
