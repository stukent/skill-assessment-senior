import { ListSelect } from 'iconoir-react'

import { MultipleChoiceEditor } from './MultipleChoiceEditor'
import { MultipleChoiceField } from './MultipleChoiceField'
import { MultipleChoiceQuizQuestion, MultipleChoiceQuizSubmissionData } from '../../../../schema'
import { getRandomString } from '../../../getRandomString'
import { QuestionType } from '../types'

export default {
  inputKey: 'multipleChoice',
  typename: 'MultipleChoiceQuizQuestion',
  submissionTypename: 'MultipleChoiceQuizSubmissionData',
  label: 'Multiple Choice',
  icon: <ListSelect />,
  defaultInput: () => ({
    options: [
      { value: getRandomString(), name: 'One', isCorrect: true },
      { value: getRandomString(), name: 'Two', isCorrect: false },
      { value: getRandomString(), name: 'Three', isCorrect: false },
      { value: getRandomString(), name: 'Four', isCorrect: false },
    ],
  }),
  editor: MultipleChoiceEditor,
  field: MultipleChoiceField,
} satisfies QuestionType<
  'multipleChoice',
  MultipleChoiceQuizQuestion,
  MultipleChoiceQuizSubmissionData
>
