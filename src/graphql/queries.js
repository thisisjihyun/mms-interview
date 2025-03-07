import { gql } from "@apollo/client";

export const GET_ISSUES = gql`
  query ($searchTerm: String!, $first: Int, $after: String) {
    search(query: $searchTerm, type: ISSUE, first: $first, after: $after) {
      edges {
        node {
          ... on Issue {
            title
            body
            number
            state
            url
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

export const GET_ISSUE_COMMENTS = gql`
  query GetIssueComments($issueNumber: Int!) {
    repository(owner: "facebook", name: "react") {
      issue(number: $issueNumber) {
        title
        body
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
