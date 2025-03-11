import React from "react";

import Comments from "./Comments";
import { Container } from "../styles/Details.styles";
import DetailsHooks from "../hooks/DetailsHooks";

const Details: React.FC = () => {
  const { data, loading, error, fetchFullIssue, issueData, issueNumber } =
    DetailsHooks();

  if (loading) {
    return <></>;
  }

  if (error) return <p>Error: {error.message}</p>;

  const issue = fetchFullIssue ? data?.repository?.issue : issueData;

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
      <Comments />
    </Container>
  );
};

export default Details;
