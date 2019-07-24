import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        posts: [Post!]!
        post(id: ID!): Post!
        subforums: [Subforum!]!
        threads(subforumName: String!): [Thread!]!
        thread(threadId: Int!): Thread!
    }

    type Post {
        id: ID!
        content: String!
        user: User!
        createdAt: String!
    }
`
