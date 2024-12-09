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

export type CreatePostInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePostInputResponse = {
  __typename?: 'CreatePostInputResponse';
  error?: Maybe<MutationResponse>;
  post?: Maybe<Post>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost?: Maybe<CreatePostInputResponse>;
  logout: MutationResponse;
  signIn: MutationResponse;
  signUp: MutationResponse;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
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

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['Int']['output']>;
  commentCount?: Maybe<Scalars['Int']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateISOString']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  points?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateISOString']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  post?: Maybe<Post>;
  posts?: Maybe<Array<Maybe<Post>>>;
};


export type QueryPostArgs = {
  id: Scalars['Int']['input'];
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
