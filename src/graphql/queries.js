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
  query GetIssueAndComments($number: Int!, $first: Int, $after: String) {
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
        comments(first: $first, after: $after) {
          nodes {
            author {
              login
            }
            body
            createdAt
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  }
`;

export const GET_COMMENTS = gql`
  query GetComments($number: Int!, $first: Int, $after: String) {
    repository(owner: "facebook", name: "react") {
      issue(number: $number) {
        comments(first: $first, after: $after) {
          nodes {
            author {
              login
            }
            body
            createdAt
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  }
`;
