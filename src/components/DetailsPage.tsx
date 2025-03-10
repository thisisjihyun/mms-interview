import React, { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Comments from "./Comments";
import { GET_ISSUE_AND_COMMENTS, GET_COMMENTS } from "../graphql/queries";
import { Container } from "../styles/DetailsPage.styles";

const DetailsPage: React.FC = () => {
  const { issueNumber } = useParams();
  const location = useLocation();
  const issueData = location.state;

  const parsedIssueNumber = useMemo(
    () => (issueNumber ? parseInt(issueNumber, 10) : NaN),
    [issueNumber]
  );

  const fetchFullIssue = !issueData; 
  const query = fetchFullIssue ? GET_ISSUE_AND_COMMENTS : GET_COMMENTS;

  const { loading, error, data } = useQuery(query, {
    variables: isNaN(parsedIssueNumber)
      ? undefined
      : { number: parsedIssueNumber },
    skip: isNaN(parsedIssueNumber),
    fetchPolicy: "cache-first",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const issue = fetchFullIssue ? data.repository.issue : issueData;
  const comments = data?.repository?.issue?.comments?.nodes || [];

  return (
    <Container>
      <h2>Issue #{issueNumber} Detail</h2>
      <p>
        <strong>State:</strong> {issue.state}
      </p>
      <p>
        <strong>Title:</strong> {issue.title}
      </p>
      <p>
        <strong>Body:</strong> {issue.body}
      </p>

      <h3>Comments</h3>
      <Comments comments={comments} />
    </Container>
  );
};

export default DetailsPage;
