import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ISSUE_COMMENTS } from "../graphql/queries";
import { Container } from "../styles/DetailsPage.styles";
import Comments from "./Comments";

const DetailsPage: React.FC = () => {
  const { issueNumber } = useParams();
  const location = useLocation();
  const { title, body, state } = location.state || {};

  const { loading, error, data } = useQuery(GET_ISSUE_COMMENTS, {
    variables: { issueNumber: parseInt(issueNumber!, 10) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const { nodes } = data.repository.issue.comments;

  return (
    <Container>
      <h2>Issue #{issueNumber} Detail</h2>
      <p>
        <strong>State:</strong> {state}
      </p>
      <p>
        <strong>Title:</strong> {title}
      </p>
      <p>
        <strong>Body:</strong> {body}
      </p>

      <h3>Comments</h3>
      <Comments comments={nodes} />
    </Container>
  );
};

export default DetailsPage;
