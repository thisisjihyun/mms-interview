import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Comments from "./Comments";
import { GET_ISSUE_AND_COMMENTS, GET_COMMENTS } from "../graphql/queries";
import { Container, CommentsContainer } from "../styles/DetailsPage.styles";

const DetailsPage: React.FC = () => {
  const { issueNumber } = useParams();
  const location = useLocation();
  const issueData = location.state;
  const [afterCursor, setAfterCursor] = useState<string | null>(null);
  const parsedIssueNumber = useMemo(
    () => (issueNumber ? parseInt(issueNumber, 10) : NaN),
    [issueNumber]
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const fetchFullIssue = !issueData;
  const query = fetchFullIssue ? GET_ISSUE_AND_COMMENTS : GET_COMMENTS;

  const [commentsData, setCommentsData] = useState<any[]>([]);

  const { loading, error, data, fetchMore } = useQuery(query, {
    variables: isNaN(parsedIssueNumber)
      ? undefined
      : { number: parsedIssueNumber, first: 10, after: afterCursor },
    skip: isNaN(parsedIssueNumber),
    fetchPolicy: "cache-first",
  });


  useEffect(() => {
    if (data?.repository?.issue?.comments?.nodes) {
      setCommentsData((prevComments) => [
        ...prevComments,
        ...data?.repository?.issue?.comments?.nodes,
      ]);
    }
  }, [data]);

  const loadMore = () => {
    if (data?.repository?.issue?.comments?.pageInfo?.hasNextPage) {
      const newCursor = data.repository?.issue.comments.pageInfo.endCursor;
      setAfterCursor(newCursor);
      fetchMore({
        variables: {
          after: newCursor,
        },
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleScroll = () => {
      if (loading) return;
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        loadMore();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [data, loading]);

  if (error) return <p>Error: {error.message}</p>;

  const issue = fetchFullIssue ? data.repository?.issue : issueData;
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
