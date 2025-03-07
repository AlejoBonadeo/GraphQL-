import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    posts: [Post!]!
  }

  type Mutation {
    postCreate(post: PostInput): PostPayload!
    postUpdate(id: ID!, post: PostInput): PostPayload!
    postDelete(id: ID!): PostPayload!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    isPublished: Boolean!
    user: User!
  }
  
  type User {
    id: ID!
    name: String!
    email: String!
    profile: Profile!
    posts: [Post!]!
  }

  type Profile {
    id: ID!
    bio: String!
    user: User!
  }

  type UserError {
    message: String!
  }

  type PostPayload {
    userErrors: [UserError!]!
    post: Post
  }

  input PostInput {
    title: String
    content: String
  }
`;
