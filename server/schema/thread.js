import { gql } from 'apollo-server-express'

export default gql`

type Thread {
    title: String!
    views: Int!
    subforum: Subforum!
    user: User!
    id: Int!
    Posts: [Post!]
    content: String!
    createdAt: String!
}

type Subforum {
    id: ID!
    description: String!
    title: String!
    Threads: [Thread!]!

}
`