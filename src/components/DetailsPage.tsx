import React from "react";

import Comments from "./Comments";
import { Container, CommentsContainer } from "../styles/DetailsPage.styles";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import DetailsHooks from "../hooks/DetailsHooks";

const DetailsPage: React.FC = () => {
  const {
    commentsData,
    data,
    containerRef,
    loadMore,
    loading,
    error,
    fetchFullIssue,
    issueData,
    issueNumber
  } = DetailsHooks();

  useInfiniteScroll(containerRef, loadMore, loading, [data]);

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

      <h3>Comments</h3>
      <CommentsContainer ref={containerRef}>
        <Comments comments={commentsData} />
      </CommentsContainer>
    </Container>
  );
};

export default DetailsPage;
