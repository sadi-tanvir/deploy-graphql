import { gql } from "@apollo/client"

export const SIGNUP_USER = gql`
mutation signUpUser($userData:UserSignUpInput!){
    user:signupUser(userData:$userData){
      firstName
    }
  }
`

export const SIGNIN_USER = gql`
mutation signInUser($userData:UserSignInInput!){
  user:signInUser(userData:$userData){
   message
   token
   user{
    	_id
      firstName
      lastName
      email
    }
  }
}
`

export const CREATE_QUOTE = gql`
mutation createQuote($name:String!){
  createQuote(name:$name)
}
`