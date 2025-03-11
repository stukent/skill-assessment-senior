import { Button, Flex, Form, Icon, InlineAlert, ProgressCircle, Text } from '@adobe/react-spectrum'
import { Check } from 'iconoir-react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

import { QuestionField } from './QuestionField'
import { QuizSubmissionDataInput, useQuizQuery } from '../../schema'

type FormValues = Record<string, any>
export interface SubmissionFormProps {
  quizId: string
  defaultValue?: FormValues
  loading?: boolean
  onSubmit?: (values: QuizSubmissionDataInput[]) => void
}
export function SubmissionForm({ quizId, defaultValue, loading, onSubmit }: SubmissionFormProps) {
  const { data, loading: quizLoading } = useQuizQuery({
    variables: { id: quizId },
  })
  const quiz = data?.node?.__typename === 'Quiz' ? data.node : undefined
  const { handleSubmit, control, reset } = useForm<FormValues>()
  React.useEffect(() => {
    reset(defaultValue)
  }, [defaultValue])

  if (quizLoading) {
    return (
      <ProgressCircle
        aria-label={'Loading quiz...'}
        alignSelf={'center'}
        margin={'size-1000'}
        isIndeterminate
      />
    )
  } else if (quiz) {
    return (
      <Form
        onSubmit={handleSubmit(values => {
          if (!onSubmit) return
          const submissionData = quiz.configuration.questions
            .map(question => {
              return values[question.id]
            })
            .filter(Boolean)
          return onSubmit(submissionData)
        })}
      >
        <Flex direction={'column'} gap={'size-100'} marginStart={'size-100'} alignItems={'stretch'}>
          {quiz.configuration.questions.map(question => {
            return (
              <Controller<FormValues, string>
                key={question.id}
                name={question.id}
                control={control}
                render={({ field, fieldState }) => (
                  <QuestionField
                    value={field.value}
                    onChange={field.onChange}
                    question={question}
                    disabled={!onSubmit}
                    validationState={
                      fieldState.invalid ? 'invalid' : fieldState.isDirty ? 'valid' : undefined
                    }
                    errorMessage={fieldState.error?.message}
                  />
                )}
                rules={{ required: 'This question is required.' }}
              />
            )
          })}
          {onSubmit ? (
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
              <Text>Submit</Text>
            </Button>
          ) : null}
        </Flex>
      </Form>
    )
  } else {
    return (
      <InlineAlert margin={'size-1000'} variant={'negative'} alignSelf={'center'} width={400}>
        Cannot find quiz.
      </InlineAlert>
    )
  }
}
