import { gql } from 'apollo-server-express'

export default gql`
    extend type Mutation {
        createPost(content: String!, userId: Int!, threadId: Int!): Post!
        deletePost(id: Int!): Boolean!
        register(userName: String!, email: String!, password: String!): LoginResponse
        login(userName: String!, password: String!): User
        logout: Boolean
        createThread(title: String!, content: String!, subforumTitle: String!, userId: Int!): Thread!
        deleteThread(id: Int!): Boolean!
        editThread(id: Int!, title: String!, content: String!): [Int]
        editPost(id: Int!, content: String!): [Int]
        updateViews(threadId: Int!): Int!
    }
`
