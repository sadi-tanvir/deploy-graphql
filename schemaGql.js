import { gql } from "apollo-server-express"

export default gql`

type Query {
    users: [User]
    user(_id:ID!): User
    quotes: [QuoteWithInfo]
    quote(by:ID!): [Quote]
}

type User {
    _id: ID
    firstName: String
    lastName: String
    email: String!
    password: String
    quotes: [Quote]
}

type QuoteWithInfo{
    name: String
    by: AuthorInfo
}

type AuthorInfo {
    _id: ID
    firstName: String
    lastName: String
}

type Quote {
    name: String
    by: AuthorInfo
}



type Mutation {
    signupUser(userData:UserSignUpInput!):User
    signInUser(userData:UserSignInInput!):LoginReturn
    createQuote(name:String):String
}



input UserSignUpInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
}



type LoginReturn {
    token:String
    message: String
    user: User
}

input UserSignInInput{
    email: String!
    password: String!
}
`