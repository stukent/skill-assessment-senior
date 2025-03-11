import { ActionButton, AlertDialog, DialogTrigger } from '@adobe/react-spectrum'

import { useDeleteNodeMutation } from '../../schema'
import { onMutationError } from '../onMutationError'

export interface DeleteQuizButtonProps {
  id: string
}
export function DeleteQuizButton({ id }: DeleteQuizButtonProps) {
  const [deleteQuiz] = useDeleteNodeMutation({
    onError: onMutationError('There was an error deleting your quiz.'),
    update(cache) {
      cache.evict({
        id: cache.identify({ __typename: 'Quiz', id }),
      })
    },
  })
  return (
    <DialogTrigger>
      <ActionButton isQuiet>Delete</ActionButton>
      <AlertDialog
        variant={'destructive'}
        title={'Delete quiz?'}
        primaryActionLabel={'Delete Quiz'}
        cancelLabel={'Cancel'}
        onPrimaryAction={async () => {
          await deleteQuiz({ variables: { id } })
        }}
      >
        This will permanently delete this quiz. Are you sure?
      </AlertDialog>
    </DialogTrigger>
  )
}
