import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import {
  Container,
  Form,
  ResultsContainer,
  Message,
} from "../styles/SearchForm.styles";
import { GET_ISSUES } from "../graphql/queries";
import SearchInput from "./SearchInput";
import IssueList from "./IssueList";

const SearchForm: React.FC = () => {
  const [status, setStatus] = useState<string>("all");
  const [issues, setIssues] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedTerm, setDebouncedTerm] = useState<string>(
    "repo:facebook/react is:issue"
  );
  const [afterCursor, setAfterCursor] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Debounce the search term to prevent making too many requests
    const handler = setTimeout(() => {
      let query = `repo:facebook/react ${searchTerm} is:issue`;

      if (status !== "all") {
        query += ` state:${status}`;
      }

      setDebouncedTerm(query);
      setAfterCursor(null);
      setIssues([]);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, status]);

  const { loading, error, data } = useQuery(GET_ISSUES, {
    variables: { searchTerm: debouncedTerm, first: 10, after: afterCursor },
    skip: !debouncedTerm,
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    // Append new issues to the existing list to keep all the issues in the list
    if (data?.search?.edges) {
      setIssues((prevIssues) => [...prevIssues, ...data.search.edges]);
    }
  }, [data]);

  const loadMore = () => {
    // Paginate the results by fetching the next page
    if (data?.search?.pageInfo?.hasNextPage) {
      const newCursor = data.search.pageInfo.endCursor;

      setAfterCursor((prevCursor) =>
        prevCursor === newCursor ? prevCursor : newCursor
      );
    }
  };

  useEffect(() => {
    // Add a scroll event listener to the container to load more issues when the user scrolls to the bottom
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

  return (
    <Container>
      <Form>
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          status={status}
          setStatus={setStatus}
        />
        {loading && <Message>Loading...</Message>}
        {error && <Message>Error: {error.message}</Message>}
        {!loading && !error && issues.length === 0 && (
          <Message>No issues found. Try a different search.</Message>
        )}

        <ResultsContainer ref={containerRef}>
          <IssueList issues={issues} />
        </ResultsContainer>
      </Form>
    </Container>
  );
};

export default SearchForm;
