import { gql } from "@apollo/client";

export const GET_ISSUES = gql`
  query ($searchTerm: String!) {
    search(query: $searchTerm, type: ISSUE, last: 10) {
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
