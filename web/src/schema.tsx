import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateQuizSubmissionInput = {
  id: Scalars['ID']['input'];
  submissionData: Array<QuizSubmissionDataInput>;
};

export type DeleteResponse = {
  __typename?: 'DeleteResponse';
  numDeleted: Scalars['Int']['output'];
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  jwt: Scalars['String']['output'];
  user: User;
};

export type MultipleChoiceQuizQuestion = QuizQuestion & {
  __typename?: 'MultipleChoiceQuizQuestion';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  options: Array<MultipleChoiceQuizQuestionOption>;
};

export type MultipleChoiceQuizQuestionInput = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  options: Array<MultipleChoiceQuizQuestionOptionInput>;
};

export type MultipleChoiceQuizQuestionOption = {
  __typename?: 'MultipleChoiceQuizQuestionOption';
  isCorrect: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type MultipleChoiceQuizQuestionOptionInput = {
  isCorrect: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type MultipleChoiceQuizSubmissionData = QuizSubmissionData & {
  __typename?: 'MultipleChoiceQuizSubmissionData';
  questionId: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type MultipleChoiceQuizSubmissionDataInput = {
  questionId: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createQuiz: QuizResponse;
  createQuizSubmission: QuizSubmissionResponse;
  deleteNode: DeleteResponse;
  login: LoginResponse;
  updateQuiz: QuizResponse;
};


export type MutationCreateQuizArgs = {
  input: QuizInput;
};


export type MutationCreateQuizSubmissionArgs = {
  input: CreateQuizSubmissionInput;
};


export type MutationDeleteNodeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationUpdateQuizArgs = {
  input?: InputMaybe<UpdateQuizInput>;
};

export type Node = {
  id: Scalars['ID']['output'];
};

export enum Permission {
  CreateQuiz = 'CREATE_QUIZ',
  Login = 'LOGIN',
  SubmitQuiz = 'SUBMIT_QUIZ',
  UpdateOwnQuiz = 'UPDATE_OWN_QUIZ',
  UpdateQuiz = 'UPDATE_QUIZ',
  ViewOwnQuizSubmissions = 'VIEW_OWN_QUIZ_SUBMISSIONS',
  ViewQuizSubmissions = 'VIEW_QUIZ_SUBMISSIONS'
}

export type Query = {
  __typename?: 'Query';
  node?: Maybe<Node>;
  quizSubmissions: Array<QuizSubmission>;
  quizzes: Array<Quiz>;
  viewer?: Maybe<User>;
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};

export type Quiz = Node & {
  __typename?: 'Quiz';
  configuration: QuizConfiguration;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  submissions: Array<QuizSubmission>;
  user: User;
};

export type QuizConfiguration = {
  __typename?: 'QuizConfiguration';
  questions: Array<QuizQuestion>;
};

export type QuizConfigurationInput = {
  questions: Array<QuizQuestionInput>;
};

export type QuizInput = {
  configuration: QuizConfigurationInput;
  name: Scalars['String']['input'];
};

export type QuizQuestion = {
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type QuizQuestionInput = {
  multipleChoice?: InputMaybe<MultipleChoiceQuizQuestionInput>;
};

export type QuizResponse = {
  __typename?: 'QuizResponse';
  quiz: Quiz;
};

export type QuizSubmission = Node & {
  __typename?: 'QuizSubmission';
  grade: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  quiz: Quiz;
  submissionData: Array<QuizSubmissionData>;
  user: User;
};

export type QuizSubmissionData = {
  questionId: Scalars['String']['output'];
};

export type QuizSubmissionDataInput = {
  multipleChoice?: InputMaybe<MultipleChoiceQuizSubmissionDataInput>;
};

export type QuizSubmissionResponse = {
  __typename?: 'QuizSubmissionResponse';
  quizSubmission: QuizSubmission;
};

export type UpdateQuizInput = {
  id: Scalars['ID']['input'];
  patch: QuizInput;
};

export type User = Node & {
  __typename?: 'User';
  group: UserGroup;
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export enum UserGroup {
  Anonymous = 'ANONYMOUS',
  Student = 'STUDENT',
  Teacher = 'TEACHER'
}

export type UserFragment = { __typename?: 'User', id: string, username: string, group: UserGroup };

export type MultipleChoiceQuizQuestionFragment = { __typename?: 'MultipleChoiceQuizQuestion', id: string, name: string, options: Array<{ __typename?: 'MultipleChoiceQuizQuestionOption', value: string, name: string, isCorrect: boolean }> };

export type QuizFragment = { __typename?: 'Quiz', id: string, name: string, configuration: { __typename?: 'QuizConfiguration', questions: Array<{ __typename: 'MultipleChoiceQuizQuestion', id: string, name: string, options: Array<{ __typename?: 'MultipleChoiceQuizQuestionOption', value: string, name: string, isCorrect: boolean }> }> } };

export type MultipleChoiceQuizSubmissionDataFragment = { __typename?: 'MultipleChoiceQuizSubmissionData', questionId: string, value: string };

export type QuizSubmissionFragment = { __typename?: 'QuizSubmission', id: string, grade: number, submissionData: Array<{ __typename?: 'MultipleChoiceQuizSubmissionData', questionId: string, value: string }>, user: { __typename?: 'User', id: string, username: string, group: UserGroup }, quiz: { __typename?: 'Quiz', id: string, name: string } };

export type CreateQuizMutationVariables = Exact<{
  input: QuizInput;
}>;


export type CreateQuizMutation = { __typename?: 'Mutation', createQuiz: { __typename?: 'QuizResponse', quiz: { __typename?: 'Quiz', id: string, name: string, configuration: { __typename?: 'QuizConfiguration', questions: Array<{ __typename: 'MultipleChoiceQuizQuestion', id: string, name: string, options: Array<{ __typename?: 'MultipleChoiceQuizQuestionOption', value: string, name: string, isCorrect: boolean }> }> } } } };

export type CreateQuizSubmissionMutationVariables = Exact<{
  input: CreateQuizSubmissionInput;
}>;


export type CreateQuizSubmissionMutation = { __typename?: 'Mutation', createQuizSubmission: { __typename?: 'QuizSubmissionResponse', quizSubmission: { __typename?: 'QuizSubmission', id: string, grade: number, submissionData: Array<{ __typename?: 'MultipleChoiceQuizSubmissionData', questionId: string, value: string }>, user: { __typename?: 'User', id: string, username: string, group: UserGroup }, quiz: { __typename?: 'Quiz', id: string, name: string } } } };

export type DeleteNodeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteNodeMutation = { __typename?: 'Mutation', deleteNode: { __typename?: 'DeleteResponse', numDeleted: number } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', jwt: string, user: { __typename?: 'User', id: string, username: string, group: UserGroup } } };

export type QuizQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type QuizQuery = { __typename?: 'Query', node?: { __typename?: 'Quiz', id: string, name: string, configuration: { __typename?: 'QuizConfiguration', questions: Array<{ __typename: 'MultipleChoiceQuizQuestion', id: string, name: string, options: Array<{ __typename?: 'MultipleChoiceQuizQuestionOption', value: string, name: string, isCorrect: boolean }> }> } } | { __typename?: 'QuizSubmission', id: string } | { __typename?: 'User', id: string } | null };

export type QuizSubmissionQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type QuizSubmissionQuery = { __typename?: 'Query', node?: { __typename?: 'Quiz', id: string } | { __typename?: 'QuizSubmission', id: string, grade: number, submissionData: Array<{ __typename?: 'MultipleChoiceQuizSubmissionData', questionId: string, value: string }>, user: { __typename?: 'User', id: string, username: string, group: UserGroup }, quiz: { __typename?: 'Quiz', id: string, name: string } } | { __typename?: 'User', id: string } | null };

export type QuizSubmissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type QuizSubmissionsQuery = { __typename?: 'Query', quizSubmissions: Array<{ __typename?: 'QuizSubmission', id: string, grade: number, submissionData: Array<{ __typename?: 'MultipleChoiceQuizSubmissionData', questionId: string, value: string }>, user: { __typename?: 'User', id: string, username: string, group: UserGroup }, quiz: { __typename?: 'Quiz', id: string, name: string } }> };

export type QuizzesQueryVariables = Exact<{ [key: string]: never; }>;


export type QuizzesQuery = { __typename?: 'Query', quizzes: Array<{ __typename?: 'Quiz', id: string, name: string, configuration: { __typename?: 'QuizConfiguration', questions: Array<{ __typename: 'MultipleChoiceQuizQuestion', id: string, name: string, options: Array<{ __typename?: 'MultipleChoiceQuizQuestionOption', value: string, name: string, isCorrect: boolean }> }> } }> };

export type UpdateQuizMutationVariables = Exact<{
  input: UpdateQuizInput;
}>;


export type UpdateQuizMutation = { __typename?: 'Mutation', updateQuiz: { __typename?: 'QuizResponse', quiz: { __typename?: 'Quiz', id: string, name: string, configuration: { __typename?: 'QuizConfiguration', questions: Array<{ __typename: 'MultipleChoiceQuizQuestion', id: string, name: string, options: Array<{ __typename?: 'MultipleChoiceQuizQuestionOption', value: string, name: string, isCorrect: boolean }> }> } } } };

export type ViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', id: string, username: string, group: UserGroup } | null };

export const MultipleChoiceQuizQuestionFragmentDoc = gql`
    fragment MultipleChoiceQuizQuestion on MultipleChoiceQuizQuestion {
  id
  name
  options {
    value
    name
    isCorrect
  }
}
    `;
export const QuizFragmentDoc = gql`
    fragment Quiz on Quiz {
  id
  name
  configuration {
    questions {
      __typename
      ...MultipleChoiceQuizQuestion
    }
  }
}
    ${MultipleChoiceQuizQuestionFragmentDoc}`;
export const MultipleChoiceQuizSubmissionDataFragmentDoc = gql`
    fragment MultipleChoiceQuizSubmissionData on MultipleChoiceQuizSubmissionData {
  questionId
  value
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  username
  group
}
    `;
export const QuizSubmissionFragmentDoc = gql`
    fragment QuizSubmission on QuizSubmission {
  id
  grade
  submissionData {
    ...MultipleChoiceQuizSubmissionData
  }
  user {
    ...User
  }
  quiz {
    id
    name
  }
}
    ${MultipleChoiceQuizSubmissionDataFragmentDoc}
${UserFragmentDoc}`;
export const CreateQuizDocument = gql`
    mutation createQuiz($input: QuizInput!) {
  createQuiz(input: $input) {
    quiz {
      ...Quiz
    }
  }
}
    ${QuizFragmentDoc}`;
export type CreateQuizMutationFn = Apollo.MutationFunction<CreateQuizMutation, CreateQuizMutationVariables>;

/**
 * __useCreateQuizMutation__
 *
 * To run a mutation, you first call `useCreateQuizMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuizMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuizMutation, { data, loading, error }] = useCreateQuizMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateQuizMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuizMutation, CreateQuizMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuizMutation, CreateQuizMutationVariables>(CreateQuizDocument, options);
      }
export type CreateQuizMutationHookResult = ReturnType<typeof useCreateQuizMutation>;
export type CreateQuizMutationResult = Apollo.MutationResult<CreateQuizMutation>;
export type CreateQuizMutationOptions = Apollo.BaseMutationOptions<CreateQuizMutation, CreateQuizMutationVariables>;
export const CreateQuizSubmissionDocument = gql`
    mutation createQuizSubmission($input: CreateQuizSubmissionInput!) {
  createQuizSubmission(input: $input) {
    quizSubmission {
      ...QuizSubmission
    }
  }
}
    ${QuizSubmissionFragmentDoc}`;
export type CreateQuizSubmissionMutationFn = Apollo.MutationFunction<CreateQuizSubmissionMutation, CreateQuizSubmissionMutationVariables>;

/**
 * __useCreateQuizSubmissionMutation__
 *
 * To run a mutation, you first call `useCreateQuizSubmissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuizSubmissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuizSubmissionMutation, { data, loading, error }] = useCreateQuizSubmissionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateQuizSubmissionMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuizSubmissionMutation, CreateQuizSubmissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuizSubmissionMutation, CreateQuizSubmissionMutationVariables>(CreateQuizSubmissionDocument, options);
      }
export type CreateQuizSubmissionMutationHookResult = ReturnType<typeof useCreateQuizSubmissionMutation>;
export type CreateQuizSubmissionMutationResult = Apollo.MutationResult<CreateQuizSubmissionMutation>;
export type CreateQuizSubmissionMutationOptions = Apollo.BaseMutationOptions<CreateQuizSubmissionMutation, CreateQuizSubmissionMutationVariables>;
export const DeleteNodeDocument = gql`
    mutation deleteNode($id: ID!) {
  deleteNode(id: $id) {
    numDeleted
  }
}
    `;
export type DeleteNodeMutationFn = Apollo.MutationFunction<DeleteNodeMutation, DeleteNodeMutationVariables>;

/**
 * __useDeleteNodeMutation__
 *
 * To run a mutation, you first call `useDeleteNodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNodeMutation, { data, loading, error }] = useDeleteNodeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteNodeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNodeMutation, DeleteNodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNodeMutation, DeleteNodeMutationVariables>(DeleteNodeDocument, options);
      }
export type DeleteNodeMutationHookResult = ReturnType<typeof useDeleteNodeMutation>;
export type DeleteNodeMutationResult = Apollo.MutationResult<DeleteNodeMutation>;
export type DeleteNodeMutationOptions = Apollo.BaseMutationOptions<DeleteNodeMutation, DeleteNodeMutationVariables>;
export const LoginDocument = gql`
    mutation login($input: LoginInput!) {
  login(input: $input) {
    user {
      ...User
    }
    jwt
  }
}
    ${UserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const QuizDocument = gql`
    query quiz($id: ID!) {
  node(id: $id) {
    id
    ...Quiz
  }
}
    ${QuizFragmentDoc}`;

/**
 * __useQuizQuery__
 *
 * To run a query within a React component, call `useQuizQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuizQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuizQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useQuizQuery(baseOptions: Apollo.QueryHookOptions<QuizQuery, QuizQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuizQuery, QuizQueryVariables>(QuizDocument, options);
      }
export function useQuizLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuizQuery, QuizQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuizQuery, QuizQueryVariables>(QuizDocument, options);
        }
export function useQuizSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<QuizQuery, QuizQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<QuizQuery, QuizQueryVariables>(QuizDocument, options);
        }
export type QuizQueryHookResult = ReturnType<typeof useQuizQuery>;
export type QuizLazyQueryHookResult = ReturnType<typeof useQuizLazyQuery>;
export type QuizSuspenseQueryHookResult = ReturnType<typeof useQuizSuspenseQuery>;
export type QuizQueryResult = Apollo.QueryResult<QuizQuery, QuizQueryVariables>;
export const QuizSubmissionDocument = gql`
    query quizSubmission($id: ID!) {
  node(id: $id) {
    id
    ...QuizSubmission
  }
}
    ${QuizSubmissionFragmentDoc}`;

/**
 * __useQuizSubmissionQuery__
 *
 * To run a query within a React component, call `useQuizSubmissionQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuizSubmissionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuizSubmissionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useQuizSubmissionQuery(baseOptions: Apollo.QueryHookOptions<QuizSubmissionQuery, QuizSubmissionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuizSubmissionQuery, QuizSubmissionQueryVariables>(QuizSubmissionDocument, options);
      }
export function useQuizSubmissionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuizSubmissionQuery, QuizSubmissionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuizSubmissionQuery, QuizSubmissionQueryVariables>(QuizSubmissionDocument, options);
        }
export function useQuizSubmissionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<QuizSubmissionQuery, QuizSubmissionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<QuizSubmissionQuery, QuizSubmissionQueryVariables>(QuizSubmissionDocument, options);
        }
export type QuizSubmissionQueryHookResult = ReturnType<typeof useQuizSubmissionQuery>;
export type QuizSubmissionLazyQueryHookResult = ReturnType<typeof useQuizSubmissionLazyQuery>;
export type QuizSubmissionSuspenseQueryHookResult = ReturnType<typeof useQuizSubmissionSuspenseQuery>;
export type QuizSubmissionQueryResult = Apollo.QueryResult<QuizSubmissionQuery, QuizSubmissionQueryVariables>;
export const QuizSubmissionsDocument = gql`
    query quizSubmissions {
  quizSubmissions {
    ...QuizSubmission
  }
}
    ${QuizSubmissionFragmentDoc}`;

/**
 * __useQuizSubmissionsQuery__
 *
 * To run a query within a React component, call `useQuizSubmissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuizSubmissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuizSubmissionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useQuizSubmissionsQuery(baseOptions?: Apollo.QueryHookOptions<QuizSubmissionsQuery, QuizSubmissionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuizSubmissionsQuery, QuizSubmissionsQueryVariables>(QuizSubmissionsDocument, options);
      }
export function useQuizSubmissionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuizSubmissionsQuery, QuizSubmissionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuizSubmissionsQuery, QuizSubmissionsQueryVariables>(QuizSubmissionsDocument, options);
        }
export function useQuizSubmissionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<QuizSubmissionsQuery, QuizSubmissionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<QuizSubmissionsQuery, QuizSubmissionsQueryVariables>(QuizSubmissionsDocument, options);
        }
export type QuizSubmissionsQueryHookResult = ReturnType<typeof useQuizSubmissionsQuery>;
export type QuizSubmissionsLazyQueryHookResult = ReturnType<typeof useQuizSubmissionsLazyQuery>;
export type QuizSubmissionsSuspenseQueryHookResult = ReturnType<typeof useQuizSubmissionsSuspenseQuery>;
export type QuizSubmissionsQueryResult = Apollo.QueryResult<QuizSubmissionsQuery, QuizSubmissionsQueryVariables>;
export const QuizzesDocument = gql`
    query quizzes {
  quizzes {
    ...Quiz
  }
}
    ${QuizFragmentDoc}`;

/**
 * __useQuizzesQuery__
 *
 * To run a query within a React component, call `useQuizzesQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuizzesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuizzesQuery({
 *   variables: {
 *   },
 * });
 */
export function useQuizzesQuery(baseOptions?: Apollo.QueryHookOptions<QuizzesQuery, QuizzesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuizzesQuery, QuizzesQueryVariables>(QuizzesDocument, options);
      }
export function useQuizzesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuizzesQuery, QuizzesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuizzesQuery, QuizzesQueryVariables>(QuizzesDocument, options);
        }
export function useQuizzesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<QuizzesQuery, QuizzesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<QuizzesQuery, QuizzesQueryVariables>(QuizzesDocument, options);
        }
export type QuizzesQueryHookResult = ReturnType<typeof useQuizzesQuery>;
export type QuizzesLazyQueryHookResult = ReturnType<typeof useQuizzesLazyQuery>;
export type QuizzesSuspenseQueryHookResult = ReturnType<typeof useQuizzesSuspenseQuery>;
export type QuizzesQueryResult = Apollo.QueryResult<QuizzesQuery, QuizzesQueryVariables>;
export const UpdateQuizDocument = gql`
    mutation updateQuiz($input: UpdateQuizInput!) {
  updateQuiz(input: $input) {
    quiz {
      ...Quiz
    }
  }
}
    ${QuizFragmentDoc}`;
export type UpdateQuizMutationFn = Apollo.MutationFunction<UpdateQuizMutation, UpdateQuizMutationVariables>;

/**
 * __useUpdateQuizMutation__
 *
 * To run a mutation, you first call `useUpdateQuizMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuizMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQuizMutation, { data, loading, error }] = useUpdateQuizMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateQuizMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQuizMutation, UpdateQuizMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQuizMutation, UpdateQuizMutationVariables>(UpdateQuizDocument, options);
      }
export type UpdateQuizMutationHookResult = ReturnType<typeof useUpdateQuizMutation>;
export type UpdateQuizMutationResult = Apollo.MutationResult<UpdateQuizMutation>;
export type UpdateQuizMutationOptions = Apollo.BaseMutationOptions<UpdateQuizMutation, UpdateQuizMutationVariables>;
export const ViewerDocument = gql`
    query viewer {
  viewer {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useViewerQuery__
 *
 * To run a query within a React component, call `useViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewerQuery({
 *   variables: {
 *   },
 * });
 */
export function useViewerQuery(baseOptions?: Apollo.QueryHookOptions<ViewerQuery, ViewerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, options);
      }
export function useViewerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewerQuery, ViewerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, options);
        }
export function useViewerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ViewerQuery, ViewerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, options);
        }
export type ViewerQueryHookResult = ReturnType<typeof useViewerQuery>;
export type ViewerLazyQueryHookResult = ReturnType<typeof useViewerLazyQuery>;
export type ViewerSuspenseQueryHookResult = ReturnType<typeof useViewerSuspenseQuery>;
export type ViewerQueryResult = Apollo.QueryResult<ViewerQuery, ViewerQueryVariables>;