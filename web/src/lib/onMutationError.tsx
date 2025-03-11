import { ApolloError } from '@apollo/client'
import { ToastQueue } from '@react-spectrum/toast'

export function onMutationError(message: string) {
  return (error: ApolloError) => {
    console.warn(error)
    ToastQueue.negative(message, { timeout: 5000 })
  }
}
