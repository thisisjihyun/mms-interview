import { gql } from "@apollo/client";

const ISSUE_FIELDS = gql`
  fragment IssueFields on Issue {
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
`;

const COMMENT_FIELDS = gql`
  fragment CommentFields on IssueComment {
    author {
      login
    }
    body
    createdAt
  }
`;

export const GET_ISSUES = gql`
  ${ISSUE_FIELDS}
  query GetIssues($searchTerm: String!, $first: Int, $after: String) {
    search(query: $searchTerm, type: ISSUE, first: $first, after: $after) {
      edges {
        node {
          ... on Issue {
            ...IssueFields
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
  ${ISSUE_FIELDS}
  ${COMMENT_FIELDS}
  query GetIssueAndComments($number: Int!, $first: Int, $after: String) {
    repository(owner: "facebook", name: "react") {
      issue(number: $number) {
        ...IssueFields
        comments(first: $first, after: $after) {
          nodes {
            ...CommentFields
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
  ${COMMENT_FIELDS}
  query GetComments($number: Int!, $first: Int, $after: String) {
    repository(owner: "facebook", name: "react") {
      issue(number: $number) {
        comments(first: $first, after: $after) {
          nodes {
            ...CommentFields
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