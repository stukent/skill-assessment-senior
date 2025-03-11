import { Text, Flex, Button, Icon, Form } from '@adobe/react-spectrum'
import { Check } from 'iconoir-react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

import { QuizConfigurationEditor } from './QuizConfigurationEditor'
import { QuizInput } from '../../schema'
import { TextField } from '../form/TextField'

export interface QuizFormProps {
  onSubmit: (values: QuizInput) => void
  defaultValue?: QuizInput
  loading?: boolean
  submitText: string
}
export function QuizForm({ onSubmit, defaultValue, loading, submitText }: QuizFormProps) {
  const { handleSubmit, control, reset } = useForm<QuizInput>()
  React.useEffect(() => {
    reset(defaultValue)
  }, [defaultValue])
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction={'column'} gap={'size-200'}>
        <TextField
          control={control}
          name={'name'}
          isRequired
          label={'Name'}
          width={'auto'}
          maxWidth={500}
        />
        <Controller<QuizInput, 'configuration'>
          name={'configuration'}
          control={control}
          render={({ field, fieldState }) => (
            <QuizConfigurationEditor
              {...field}
              validationState={
                fieldState.invalid ? 'invalid' : fieldState.isDirty ? 'valid' : undefined
              }
              errorMessage={fieldState.error?.message}
            />
          )}
          rules={{
            required: 'This field is required.',
          }}
        />
        <Button
          alignSelf={'flex-start'}
          variant={'accent'}
          style={'fill'}
          type={'submit'}
          marginTop={'size-500'}
          isPending={loading}
        >
          <Icon>
            <Check />
          </Icon>
          <Text>{submitText}</Text>
        </Button>
      </Flex>
    </Form>
  )
}
