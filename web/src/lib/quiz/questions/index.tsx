import multipleChoice from './multipleChoice'
import { QuestionType } from './types'
import { QuizQuestionInput } from '../../../schema'

export default [multipleChoice] as QuestionType<keyof QuizQuestionInput, any, any>[]
