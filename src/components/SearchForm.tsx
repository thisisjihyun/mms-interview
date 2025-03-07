import React, { useState, useEffect } from "react";
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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<string>("all");
  const [debouncedTerm, setDebouncedTerm] = useState<string>(
    "repo:facebook/react is:issue"
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      let query = `repo:facebook/react ${searchTerm} is:issue`;

      if (status !== "all") {
        query += ` state:${status}`;
        setDebouncedTerm(query);
      }

      if (searchTerm) {
        setDebouncedTerm(query);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, status]);

  const { loading, error, data } = useQuery(GET_ISSUES, {
    variables: { searchTerm: debouncedTerm },
    skip: !debouncedTerm,
  });

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
        {!loading && !error && data?.search.edges.length === 0 && (
          <Message>No issues found. Try a different search.</Message>
        )}
        {data && (
          <ResultsContainer>
            <ResultsList>
              {data.search.edges.map((edge: any) => (
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
        )}
      </Form>
    </Container>
  );
};

export default SearchForm;
