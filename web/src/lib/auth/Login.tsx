import { Form, Button, Flex, Heading, Text, Icon } from '@adobe/react-spectrum'
import { useApolloClient } from '@apollo/client'
import { ToastQueue } from '@react-spectrum/toast'
import { Check } from 'iconoir-react'
import { useForm } from 'react-hook-form'

import { setAuthToken } from './useAuthToken'
import { useProtectedRoute } from './useProtectedRoute'
import { useLoginMutation } from '../../schema'
import { TextField } from '../form/TextField'
import { onMutationError } from '../onMutationError'

export function Login() {
  useProtectedRoute(null)
  const { control, handleSubmit } = useForm<{ username: string; password: string }>()
  const client = useApolloClient()
  const [login, { loading }] = useLoginMutation({
    onError: onMutationError('There was an error logging in.'),
    async onCompleted(data) {
      const { user, jwt } = data.login
      ToastQueue.positive(
        <>
          Welcome back, <strong>{user.username}!</strong>
        </>,
        {
          timeout: 3000,
        },
      )
      setAuthToken(jwt)
      await client.resetStore()
    },
  })
  return (
    <>
      <Heading level={1}>Login to Quiz Manager</Heading>
      <Form
        onSubmit={handleSubmit(async values => {
          await login({
            variables: {
              input: values,
            },
          })
        })}
      >
        <Flex direction={'column'} gap={'size-200'} justifyContent={'stretch'}>
          <TextField
            control={control}
            name={'username'}
            label={'Username'}
            width={'auto'}
            description={'teacher or student'}
            isRequired
          />
          <TextField
            control={control}
            name={'password'}
            label={'Password'}
            type={'password'}
            width={'auto'}
            description={'testing-[group]'}
            isRequired
          />
          <Button
            alignSelf={'flex-end'}
            variant={'accent'}
            style={'fill'}
            type={'submit'}
            marginTop={'size-500'}
            isPending={loading}
          >
            <Icon>
              <Check />
            </Icon>
            <Text>Login</Text>
          </Button>
        </Flex>
      </Form>
    </>
  )
}
