import { GraphQLResolveInfo } from 'graphql';
import { User as UserModel } from './models/User.ts';
import { Quiz as QuizModel } from './models/Quiz.ts';
import { QuizSubmission as QuizSubmissionModel } from './models/QuizSubmission.ts';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type EntireFieldWrapper<T> = T | Promise<T> | (() => T | Promise<T>);
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  numDeleted: EntireFieldWrapper<Scalars['Int']['output']>;
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  jwt: EntireFieldWrapper<Scalars['String']['output']>;
  user: EntireFieldWrapper<User>;
};

export type MultipleChoiceQuizQuestion = QuizQuestion & {
  __typename?: 'MultipleChoiceQuizQuestion';
  id: EntireFieldWrapper<Scalars['String']['output']>;
  name: EntireFieldWrapper<Scalars['String']['output']>;
  options: EntireFieldWrapper<Array<MultipleChoiceQuizQuestionOption>>;
};

export type MultipleChoiceQuizQuestionInput = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  options: Array<MultipleChoiceQuizQuestionOptionInput>;
};

export type MultipleChoiceQuizQuestionOption = {
  __typename?: 'MultipleChoiceQuizQuestionOption';
  isCorrect: EntireFieldWrapper<Scalars['Boolean']['output']>;
  name: EntireFieldWrapper<Scalars['String']['output']>;
  value: EntireFieldWrapper<Scalars['String']['output']>;
};

export type MultipleChoiceQuizQuestionOptionInput = {
  isCorrect: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type MultipleChoiceQuizSubmissionData = QuizSubmissionData & {
  __typename?: 'MultipleChoiceQuizSubmissionData';
  questionId: EntireFieldWrapper<Scalars['String']['output']>;
  value: EntireFieldWrapper<Scalars['String']['output']>;
};

export type MultipleChoiceQuizSubmissionDataInput = {
  questionId: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createQuiz: EntireFieldWrapper<QuizResponse>;
  createQuizSubmission: EntireFieldWrapper<QuizSubmissionResponse>;
  deleteNode: EntireFieldWrapper<DeleteResponse>;
  login: EntireFieldWrapper<LoginResponse>;
  updateQuiz: EntireFieldWrapper<QuizResponse>;
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
  id: EntireFieldWrapper<Scalars['ID']['output']>;
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
  node?: EntireFieldWrapper<Maybe<Node>>;
  quizSubmissions: EntireFieldWrapper<Array<QuizSubmission>>;
  quizzes: EntireFieldWrapper<Array<Quiz>>;
  viewer?: EntireFieldWrapper<Maybe<User>>;
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};

export type Quiz = Node & {
  __typename?: 'Quiz';
  configuration: EntireFieldWrapper<QuizConfiguration>;
  id: EntireFieldWrapper<Scalars['ID']['output']>;
  name: EntireFieldWrapper<Scalars['String']['output']>;
  submissions: EntireFieldWrapper<Array<QuizSubmission>>;
  user: EntireFieldWrapper<User>;
};

export type QuizConfiguration = {
  __typename?: 'QuizConfiguration';
  questions: EntireFieldWrapper<Array<QuizQuestion>>;
};

export type QuizConfigurationInput = {
  questions: Array<QuizQuestionInput>;
};

export type QuizInput = {
  configuration: QuizConfigurationInput;
  name: Scalars['String']['input'];
};

export type QuizQuestion = {
  id: EntireFieldWrapper<Scalars['String']['output']>;
  name: EntireFieldWrapper<Scalars['String']['output']>;
};

export type QuizQuestionInput = {
  multipleChoice?: InputMaybe<MultipleChoiceQuizQuestionInput>;
};

export type QuizResponse = {
  __typename?: 'QuizResponse';
  quiz: EntireFieldWrapper<Quiz>;
};

export type QuizSubmission = Node & {
  __typename?: 'QuizSubmission';
  grade: EntireFieldWrapper<Scalars['Float']['output']>;
  id: EntireFieldWrapper<Scalars['ID']['output']>;
  quiz: EntireFieldWrapper<Quiz>;
  submissionData: EntireFieldWrapper<Array<QuizSubmissionData>>;
  user: EntireFieldWrapper<User>;
};

export type QuizSubmissionData = {
  questionId: EntireFieldWrapper<Scalars['String']['output']>;
};

export type QuizSubmissionDataInput = {
  multipleChoice?: InputMaybe<MultipleChoiceQuizSubmissionDataInput>;
};

export type QuizSubmissionResponse = {
  __typename?: 'QuizSubmissionResponse';
  quizSubmission: EntireFieldWrapper<QuizSubmission>;
};

export type UpdateQuizInput = {
  id: Scalars['ID']['input'];
  patch: QuizInput;
};

export type User = Node & {
  __typename?: 'User';
  group: EntireFieldWrapper<UserGroup>;
  id: EntireFieldWrapper<Scalars['ID']['output']>;
  username: EntireFieldWrapper<Scalars['String']['output']>;
};

export enum UserGroup {
  Anonymous = 'ANONYMOUS',
  Student = 'STUDENT',
  Teacher = 'TEACHER'
}



export type ResolverTypeWrapper<T> = T | Promise<T> | (() => T | null | Promise<T | null>);


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = {
  Node: ( QuizModel ) | ( QuizSubmissionModel ) | ( UserModel );
  QuizQuestion: ( MultipleChoiceQuizQuestion );
  QuizSubmissionData: ( MultipleChoiceQuizSubmissionData );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateQuizSubmissionInput: CreateQuizSubmissionInput;
  DeleteResponse: ResolverTypeWrapper<DeleteResponse>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LoginInput: LoginInput;
  LoginResponse: ResolverTypeWrapper<Omit<LoginResponse, 'user'> & { user: ResolversTypes['User'] }>;
  MultipleChoiceQuizQuestion: ResolverTypeWrapper<MultipleChoiceQuizQuestion>;
  MultipleChoiceQuizQuestionInput: MultipleChoiceQuizQuestionInput;
  MultipleChoiceQuizQuestionOption: ResolverTypeWrapper<MultipleChoiceQuizQuestionOption>;
  MultipleChoiceQuizQuestionOptionInput: MultipleChoiceQuizQuestionOptionInput;
  MultipleChoiceQuizSubmissionData: ResolverTypeWrapper<MultipleChoiceQuizSubmissionData>;
  MultipleChoiceQuizSubmissionDataInput: MultipleChoiceQuizSubmissionDataInput;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Node']>;
  Permission: Permission;
  Query: ResolverTypeWrapper<{}>;
  Quiz: ResolverTypeWrapper<QuizModel>;
  QuizConfiguration: ResolverTypeWrapper<QuizConfiguration>;
  QuizConfigurationInput: QuizConfigurationInput;
  QuizInput: QuizInput;
  QuizQuestion: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['QuizQuestion']>;
  QuizQuestionInput: QuizQuestionInput;
  QuizResponse: ResolverTypeWrapper<Omit<QuizResponse, 'quiz'> & { quiz: ResolversTypes['Quiz'] }>;
  QuizSubmission: ResolverTypeWrapper<QuizSubmissionModel>;
  QuizSubmissionData: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['QuizSubmissionData']>;
  QuizSubmissionDataInput: QuizSubmissionDataInput;
  QuizSubmissionResponse: ResolverTypeWrapper<Omit<QuizSubmissionResponse, 'quizSubmission'> & { quizSubmission: ResolversTypes['QuizSubmission'] }>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateQuizInput: UpdateQuizInput;
  User: ResolverTypeWrapper<UserModel>;
  UserGroup: UserGroup;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CreateQuizSubmissionInput: CreateQuizSubmissionInput;
  DeleteResponse: DeleteResponse;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  LoginInput: LoginInput;
  LoginResponse: Omit<LoginResponse, 'user'> & { user: ResolversParentTypes['User'] };
  MultipleChoiceQuizQuestion: MultipleChoiceQuizQuestion;
  MultipleChoiceQuizQuestionInput: MultipleChoiceQuizQuestionInput;
  MultipleChoiceQuizQuestionOption: MultipleChoiceQuizQuestionOption;
  MultipleChoiceQuizQuestionOptionInput: MultipleChoiceQuizQuestionOptionInput;
  MultipleChoiceQuizSubmissionData: MultipleChoiceQuizSubmissionData;
  MultipleChoiceQuizSubmissionDataInput: MultipleChoiceQuizSubmissionDataInput;
  Mutation: {};
  Node: ResolversInterfaceTypes<ResolversParentTypes>['Node'];
  Query: {};
  Quiz: QuizModel;
  QuizConfiguration: QuizConfiguration;
  QuizConfigurationInput: QuizConfigurationInput;
  QuizInput: QuizInput;
  QuizQuestion: ResolversInterfaceTypes<ResolversParentTypes>['QuizQuestion'];
  QuizQuestionInput: QuizQuestionInput;
  QuizResponse: Omit<QuizResponse, 'quiz'> & { quiz: ResolversParentTypes['Quiz'] };
  QuizSubmission: QuizSubmissionModel;
  QuizSubmissionData: ResolversInterfaceTypes<ResolversParentTypes>['QuizSubmissionData'];
  QuizSubmissionDataInput: QuizSubmissionDataInput;
  QuizSubmissionResponse: Omit<QuizSubmissionResponse, 'quizSubmission'> & { quizSubmission: ResolversParentTypes['QuizSubmission'] };
  String: Scalars['String']['output'];
  UpdateQuizInput: UpdateQuizInput;
  User: UserModel;
};

export type AuthDirectiveArgs = {
  own?: Maybe<Permission>;
  requires?: Maybe<Permission>;
};

export type AuthDirectiveResolver<Result, Parent, ContextType = any, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type GrantDirectiveArgs = {
  to: Array<UserGroup>;
};

export type GrantDirectiveResolver<Result, Parent, ContextType = any, Args = GrantDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type DeleteResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteResponse'] = ResolversParentTypes['DeleteResponse']> = {
  numDeleted?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = {
  jwt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MultipleChoiceQuizQuestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MultipleChoiceQuizQuestion'] = ResolversParentTypes['MultipleChoiceQuizQuestion']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  options?: Resolver<Array<ResolversTypes['MultipleChoiceQuizQuestionOption']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MultipleChoiceQuizQuestionOptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MultipleChoiceQuizQuestionOption'] = ResolversParentTypes['MultipleChoiceQuizQuestionOption']> = {
  isCorrect?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MultipleChoiceQuizSubmissionDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['MultipleChoiceQuizSubmissionData'] = ResolversParentTypes['MultipleChoiceQuizSubmissionData']> = {
  questionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createQuiz?: Resolver<ResolversTypes['QuizResponse'], ParentType, ContextType, RequireFields<MutationCreateQuizArgs, 'input'>>;
  createQuizSubmission?: Resolver<ResolversTypes['QuizSubmissionResponse'], ParentType, ContextType, RequireFields<MutationCreateQuizSubmissionArgs, 'input'>>;
  deleteNode?: Resolver<ResolversTypes['DeleteResponse'], ParentType, ContextType, RequireFields<MutationDeleteNodeArgs, 'id'>>;
  login?: Resolver<ResolversTypes['LoginResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  updateQuiz?: Resolver<ResolversTypes['QuizResponse'], ParentType, ContextType, Partial<MutationUpdateQuizArgs>>;
};

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'Quiz' | 'QuizSubmission' | 'User', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QueryNodeArgs, 'id'>>;
  quizSubmissions?: Resolver<Array<ResolversTypes['QuizSubmission']>, ParentType, ContextType>;
  quizzes?: Resolver<Array<ResolversTypes['Quiz']>, ParentType, ContextType>;
  viewer?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type QuizResolvers<ContextType = any, ParentType extends ResolversParentTypes['Quiz'] = ResolversParentTypes['Quiz']> = {
  configuration?: Resolver<ResolversTypes['QuizConfiguration'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  submissions?: Resolver<Array<ResolversTypes['QuizSubmission']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QuizConfigurationResolvers<ContextType = any, ParentType extends ResolversParentTypes['QuizConfiguration'] = ResolversParentTypes['QuizConfiguration']> = {
  questions?: Resolver<Array<ResolversTypes['QuizQuestion']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QuizQuestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['QuizQuestion'] = ResolversParentTypes['QuizQuestion']> = {
  __resolveType: TypeResolveFn<'MultipleChoiceQuizQuestion', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type QuizResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['QuizResponse'] = ResolversParentTypes['QuizResponse']> = {
  quiz?: Resolver<ResolversTypes['Quiz'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QuizSubmissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['QuizSubmission'] = ResolversParentTypes['QuizSubmission']> = {
  grade?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  quiz?: Resolver<ResolversTypes['Quiz'], ParentType, ContextType>;
  submissionData?: Resolver<Array<ResolversTypes['QuizSubmissionData']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QuizSubmissionDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['QuizSubmissionData'] = ResolversParentTypes['QuizSubmissionData']> = {
  __resolveType: TypeResolveFn<'MultipleChoiceQuizSubmissionData', ParentType, ContextType>;
  questionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type QuizSubmissionResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['QuizSubmissionResponse'] = ResolversParentTypes['QuizSubmissionResponse']> = {
  quizSubmission?: Resolver<ResolversTypes['QuizSubmission'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  group?: Resolver<ResolversTypes['UserGroup'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DeleteResponse?: DeleteResponseResolvers<ContextType>;
  LoginResponse?: LoginResponseResolvers<ContextType>;
  MultipleChoiceQuizQuestion?: MultipleChoiceQuizQuestionResolvers<ContextType>;
  MultipleChoiceQuizQuestionOption?: MultipleChoiceQuizQuestionOptionResolvers<ContextType>;
  MultipleChoiceQuizSubmissionData?: MultipleChoiceQuizSubmissionDataResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Quiz?: QuizResolvers<ContextType>;
  QuizConfiguration?: QuizConfigurationResolvers<ContextType>;
  QuizQuestion?: QuizQuestionResolvers<ContextType>;
  QuizResponse?: QuizResponseResolvers<ContextType>;
  QuizSubmission?: QuizSubmissionResolvers<ContextType>;
  QuizSubmissionData?: QuizSubmissionDataResolvers<ContextType>;
  QuizSubmissionResponse?: QuizSubmissionResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>;
  grant?: GrantDirectiveResolver<any, any, ContextType>;
};
