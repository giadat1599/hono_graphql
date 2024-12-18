export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A custom Date scalar type */
  DateISOString: { input: any; output: any; }
};

export type Comment = {
  __typename?: 'Comment';
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['Int']['output']>;
  childComments?: Maybe<Array<Maybe<Comment>>>;
  commentCount: Scalars['Int']['output'];
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateISOString']['output'];
  depth: Scalars['Int']['output'];
  id?: Maybe<Scalars['Int']['output']>;
  parentCommentId?: Maybe<Scalars['Int']['output']>;
  points: Scalars['Int']['output'];
  post: Post;
  postId: Scalars['Int']['output'];
  updatedAt: Scalars['DateISOString']['output'];
};

export type CreatePostCommentInput = {
  content: Scalars['String']['input'];
  postId: Scalars['Int']['input'];
};

export type CreatePostCommentPayload = {
  __typename?: 'CreatePostCommentPayload';
  comment?: Maybe<Comment>;
  /** Validation errors if any */
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Indicates whether the mutation is successful or not. */
  success: Scalars['Boolean']['output'];
};

export type CreatePostInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePostPayload = {
  __typename?: 'CreatePostPayload';
  /** Validation errors if any */
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  post?: Maybe<Post>;
  /** Indicates whether the mutation is successful or not. */
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost?: Maybe<CreatePostPayload>;
  createPostComment?: Maybe<CreatePostCommentPayload>;
  logout: MutationResponse;
  signIn: MutationResponse;
  signUp: MutationResponse;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreatePostCommentArgs = {
  input: CreatePostCommentInput;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  /** Validation errors if any */
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Indicates whether the mutation is successful or not. */
  success: Scalars['Boolean']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedPost = {
  __typename?: 'PaginatedPost';
  data?: Maybe<Array<Maybe<Post>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  authorId: Scalars['Int']['output'];
  commentCount: Scalars['Int']['output'];
  comments?: Maybe<Array<Maybe<Comment>>>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateISOString']['output'];
  id: Scalars['Int']['output'];
  points: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateISOString']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  post?: Maybe<Post>;
  posts?: Maybe<PaginatedPost>;
};


export type QueryPostArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPostsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextCursor?: InputMaybe<Scalars['String']['input']>;
};

export type SignInInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type SignUpInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateISOString']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateISOString']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};
