import { gql } from "@apollo/client";

export const GET_ISSUES = gql`
  query getIssues($searchTerm: String!, $first: Int, $after: String) {
    search(query: $searchTerm, type: ISSUE, first: $first, after: $after) {
      edges {
        node {
          ... on Issue {
            title
            body
            number
            state
            url
            createdAt
            author {
              login
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const GET_ISSUE_AND_COMMENTS = gql`
  query GetIssueAndComments($number: Int!) {
    repository(owner: "facebook", name: "react") {
      issue(number: $number) {
        title
        body
        state
        createdAt
        body
        author {
          login
        }
        comments(first: 10) {
          nodes {
            author {
              login
            }
            body
            createdAt
          }
        }
      }
    }
  }
`;

export const GET_COMMENTS = gql`
  query GetComments($number: Int!) {
    repository(owner: "facebook", name: "react") {
      issue(number: $number) {
        comments(first: 10) {
          nodes {
            author {
              login
            }
            body
            createdAt
          }
        }
      }
    }
  }
`;
