import { gql } from "@apollo/client"

export const GET_ALL_QUOTES = gql`
query getAllQuotes{
    quotes{
      name
      by{
        firstName
      }
    }
  }
`


export const GET_USER_INFORMATION = gql`
query findUser{
  user(_id:""){
    email
    firstName
    lastName
    quotes{
      name
      by{
        firstName
      }
    }
  }
}
`