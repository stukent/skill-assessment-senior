import { TextField as STextField, SpectrumTextFieldProps } from '@adobe/react-spectrum'
import { Control, Controller } from 'react-hook-form'

export interface TextFieldProps extends SpectrumTextFieldProps {
  control: Control<any, any>
  name: string
}
export function TextField({ control, name, ...rest }: TextFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <STextField
          {...rest}
          validationState={
            fieldState.invalid ? 'invalid' : fieldState.isDirty ? 'valid' : undefined
          }
          errorMessage={fieldState.error?.message}
          {...field}
        />
      )}
      rules={{
        required: rest.isRequired ? 'This field is required.' : undefined,
      }}
    />
  )
}
