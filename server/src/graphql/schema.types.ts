import { GraphQLResolveInfo } from 'graphql'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export interface AddCommentInput {
  id: Scalars['Int']
  text: Scalars['String']
  name: Scalars['String']
  date: Scalars['String']
}

export interface AddFavoriteInput {
  hike: AddHikeInput
}

export interface AddHikeInput {
  id: Scalars['Int']
  name: Scalars['String']
  summary: Scalars['String']
  stars: Scalars['Float']
  difficulty: Scalars['String']
  location: Scalars['String']
  length: Scalars['Float']
  latitude: Scalars['Float']
  longitude: Scalars['Float']
}

export interface Comment {
  __typename?: 'Comment'
  id: Scalars['Int']
  text: Scalars['String']
  name: Scalars['String']
  date: Scalars['String']
  likes: Scalars['Int']
  hikeNum: Scalars['Int']
  hike?: Maybe<Hike>
}

export interface Coordinates {
  __typename?: 'Coordinates'
  zipcode: Scalars['Int']
  lat: Scalars['Float']
  lon: Scalars['Float']
}

export interface DownvoteInput {
  id: Scalars['Int']
  text: Scalars['String']
  name: Scalars['String']
  date: Scalars['String']
}

export interface Hike {
  __typename?: 'Hike'
  id: Scalars['Int']
  name: Scalars['String']
  summary: Scalars['String']
  stars: Scalars['Float']
  difficulty: Scalars['String']
  location: Scalars['String']
  length: Scalars['Float']
  latitude: Scalars['Float']
  longitude: Scalars['Float']
}

export interface Mutation {
  __typename?: 'Mutation'
  addComment: Scalars['Boolean']
  upvoteComment: Scalars['Boolean']
  downvoteComment: Scalars['Boolean']
  addFavorite: Scalars['Boolean']
  removeFavorite: Scalars['Boolean']
  addHike: Scalars['Boolean']
  answerSurvey: Scalars['Boolean']
  nextSurveyQuestion?: Maybe<Survey>
}

export interface MutationAddCommentArgs {
  input: AddCommentInput
}

export interface MutationUpvoteCommentArgs {
  input: UpvoteInput
}

export interface MutationDownvoteCommentArgs {
  input: DownvoteInput
}

export interface MutationAddFavoriteArgs {
  input: AddFavoriteInput
}

export interface MutationRemoveFavoriteArgs {
  input: RemoveFavoriteInput
}

export interface MutationAddHikeArgs {
  input: AddHikeInput
}

export interface MutationAnswerSurveyArgs {
  input: SurveyInput
}

export interface MutationNextSurveyQuestionArgs {
  surveyId: Scalars['Int']
}

export interface Query {
  __typename?: 'Query'
  self?: Maybe<User>
  surveys: Array<Survey>
  survey?: Maybe<Survey>
  coordinates?: Maybe<Coordinates>
  hike?: Maybe<Hike>
  comment: Array<Comment>
  comments: Array<Comment>
  hikes: Array<Hike>
}

export interface QuerySurveyArgs {
  surveyId: Scalars['Int']
}

export interface QueryCoordinatesArgs {
  zipcode: Scalars['Int']
}

export interface QueryHikeArgs {
  id: Scalars['Int']
}

export interface QueryCommentArgs {
  id: Scalars['Int']
}

export interface RemoveFavoriteInput {
  hike: AddHikeInput
}

export interface Subscription {
  __typename?: 'Subscription'
  surveyUpdates?: Maybe<Survey>
}

export interface SubscriptionSurveyUpdatesArgs {
  surveyId: Scalars['Int']
}

export interface Survey {
  __typename?: 'Survey'
  id: Scalars['Int']
  name: Scalars['String']
  isStarted: Scalars['Boolean']
  isCompleted: Scalars['Boolean']
  currentQuestion?: Maybe<SurveyQuestion>
  questions: Array<Maybe<SurveyQuestion>>
}

export interface SurveyAnswer {
  __typename?: 'SurveyAnswer'
  id: Scalars['Int']
  answer: Scalars['String']
  question: SurveyQuestion
}

export interface SurveyInput {
  questionId: Scalars['Int']
  answer: Scalars['String']
}

export interface SurveyQuestion {
  __typename?: 'SurveyQuestion'
  id: Scalars['Int']
  prompt: Scalars['String']
  choices?: Maybe<Array<Scalars['String']>>
  answers: Array<SurveyAnswer>
  survey: Survey
}

export interface UpvoteInput {
  id: Scalars['Int']
  text: Scalars['String']
  name: Scalars['String']
  date: Scalars['String']
}

export interface User {
  __typename?: 'User'
  id: Scalars['Int']
  userType: UserType
  email: Scalars['String']
  name: Scalars['String']
  favorites: Array<Maybe<Hike>>
  comment: Array<Maybe<Comment>>
}

export enum UserType {
  Admin = 'ADMIN',
  User = 'USER',
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>
  User: ResolverTypeWrapper<User>
  Int: ResolverTypeWrapper<Scalars['Int']>
  UserType: UserType
  String: ResolverTypeWrapper<Scalars['String']>
  Hike: ResolverTypeWrapper<Hike>
  Float: ResolverTypeWrapper<Scalars['Float']>
  Comment: ResolverTypeWrapper<Comment>
  Survey: ResolverTypeWrapper<Survey>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  SurveyQuestion: ResolverTypeWrapper<SurveyQuestion>
  SurveyAnswer: ResolverTypeWrapper<SurveyAnswer>
  Coordinates: ResolverTypeWrapper<Coordinates>
  Mutation: ResolverTypeWrapper<{}>
  AddCommentInput: AddCommentInput
  UpvoteInput: UpvoteInput
  DownvoteInput: DownvoteInput
  AddFavoriteInput: AddFavoriteInput
  AddHikeInput: AddHikeInput
  RemoveFavoriteInput: RemoveFavoriteInput
  SurveyInput: SurveyInput
  Subscription: ResolverTypeWrapper<{}>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  User: User
  Int: Scalars['Int']
  String: Scalars['String']
  Hike: Hike
  Float: Scalars['Float']
  Comment: Comment
  Survey: Survey
  Boolean: Scalars['Boolean']
  SurveyQuestion: SurveyQuestion
  SurveyAnswer: SurveyAnswer
  Coordinates: Coordinates
  Mutation: {}
  AddCommentInput: AddCommentInput
  UpvoteInput: UpvoteInput
  DownvoteInput: DownvoteInput
  AddFavoriteInput: AddFavoriteInput
  AddHikeInput: AddHikeInput
  RemoveFavoriteInput: RemoveFavoriteInput
  SurveyInput: SurveyInput
  Subscription: {}
}

export type CommentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  likes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  hikeNum?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  hike?: Resolver<Maybe<ResolversTypes['Hike']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CoordinatesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Coordinates'] = ResolversParentTypes['Coordinates']
> = {
  zipcode?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  lat?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  lon?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type HikeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Hike'] = ResolversParentTypes['Hike']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  summary?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  stars?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  difficulty?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  length?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  addComment?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationAddCommentArgs, 'input'>
  >
  upvoteComment?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationUpvoteCommentArgs, 'input'>
  >
  downvoteComment?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationDownvoteCommentArgs, 'input'>
  >
  addFavorite?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationAddFavoriteArgs, 'input'>
  >
  removeFavorite?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveFavoriteArgs, 'input'>
  >
  addHike?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationAddHikeArgs, 'input'>>
  answerSurvey?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationAnswerSurveyArgs, 'input'>
  >
  nextSurveyQuestion?: Resolver<
    Maybe<ResolversTypes['Survey']>,
    ParentType,
    ContextType,
    RequireFields<MutationNextSurveyQuestionArgs, 'surveyId'>
  >
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  self?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  surveys?: Resolver<Array<ResolversTypes['Survey']>, ParentType, ContextType>
  survey?: Resolver<
    Maybe<ResolversTypes['Survey']>,
    ParentType,
    ContextType,
    RequireFields<QuerySurveyArgs, 'surveyId'>
  >
  coordinates?: Resolver<
    Maybe<ResolversTypes['Coordinates']>,
    ParentType,
    ContextType,
    RequireFields<QueryCoordinatesArgs, 'zipcode'>
  >
  hike?: Resolver<Maybe<ResolversTypes['Hike']>, ParentType, ContextType, RequireFields<QueryHikeArgs, 'id'>>
  comment?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QueryCommentArgs, 'id'>>
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>
  hikes?: Resolver<Array<ResolversTypes['Hike']>, ParentType, ContextType>
}

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
  surveyUpdates?: SubscriptionResolver<
    Maybe<ResolversTypes['Survey']>,
    'surveyUpdates',
    ParentType,
    ContextType,
    RequireFields<SubscriptionSurveyUpdatesArgs, 'surveyId'>
  >
}

export type SurveyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Survey'] = ResolversParentTypes['Survey']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isStarted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  isCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  currentQuestion?: Resolver<Maybe<ResolversTypes['SurveyQuestion']>, ParentType, ContextType>
  questions?: Resolver<Array<Maybe<ResolversTypes['SurveyQuestion']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SurveyAnswerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SurveyAnswer'] = ResolversParentTypes['SurveyAnswer']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  answer?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  question?: Resolver<ResolversTypes['SurveyQuestion'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SurveyQuestionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SurveyQuestion'] = ResolversParentTypes['SurveyQuestion']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  prompt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  choices?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>
  answers?: Resolver<Array<ResolversTypes['SurveyAnswer']>, ParentType, ContextType>
  survey?: Resolver<ResolversTypes['Survey'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  userType?: Resolver<ResolversTypes['UserType'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  favorites?: Resolver<Array<Maybe<ResolversTypes['Hike']>>, ParentType, ContextType>
  comment?: Resolver<Array<Maybe<ResolversTypes['Comment']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  Comment?: CommentResolvers<ContextType>
  Coordinates?: CoordinatesResolvers<ContextType>
  Hike?: HikeResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
  Survey?: SurveyResolvers<ContextType>
  SurveyAnswer?: SurveyAnswerResolvers<ContextType>
  SurveyQuestion?: SurveyQuestionResolvers<ContextType>
  User?: UserResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
