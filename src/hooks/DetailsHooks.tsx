import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_ISSUE_AND_COMMENTS, GET_COMMENTS } from "../graphql/queries";

const DetailsHooks = () => {
  const location = useLocation();
  const { issueNumber } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const [commentsData, setCommentsData] = useState<any[]>([]);
  const [afterCursor, setAfterCursor] = useState<string | null>(null);

  const parsedIssueNumber = useMemo(
    () => (issueNumber ? parseInt(issueNumber, 10) : NaN),
    [issueNumber]
  );
  const issueData = location.state;
  const fetchFullIssue = !issueData;
  const query = fetchFullIssue ? GET_ISSUE_AND_COMMENTS : GET_COMMENTS;

  const { loading, error, data, fetchMore } = useQuery(query, {
    variables: isNaN(parsedIssueNumber)
      ? undefined
      : { number: parsedIssueNumber, first: 10, after: afterCursor },
    skip: isNaN(parsedIssueNumber),
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
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

  return {
    commentsData,
    data,
    containerRef,
    loadMore,
    loading,
    error,
    fetchFullIssue,
    issueData,
    issueNumber,
  };
};

export default DetailsHooks;
