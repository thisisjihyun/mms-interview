import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import {
  Container,
  Form,
  Input,
  StyledLink,
  ResultsContainer,
  ResultsList,
  ResultsItem,
  Message,
  Label,
} from "../styles/SearchForm.styles";
import { GET_ISSUES } from "../graphql/queries";

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
        <div>
          <Label htmlFor="searchTerm">Search Term</Label>
          <Input
            type="text"
            id="searchTerm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search an issue"
          />

          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {loading && <Message>Loading...</Message>}
        {error && <Message>Error: {error.message}</Message>}
        {!loading && !error && issues.length === 0 && (
          <Message>No issues found. Try a different search.</Message>
        )}

        <ResultsContainer ref={containerRef}>
          <ResultsList>
            {issues.map((edge: any) => (
              <ResultsItem key={edge.node.number}>
                <a
                  href={edge.node.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {edge.node.title}
                </a>
                <p>Status: {edge.node.state}</p>
                <StyledLink
                  to={`/result/${edge.node.number}`}
                  state={edge.node}
                >
                  View Issue
                </StyledLink>
              </ResultsItem>
            ))}
          </ResultsList>
        </ResultsContainer>
      </Form>
    </Container>
  );
};

export default SearchForm;
