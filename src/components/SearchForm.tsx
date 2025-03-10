import React from "react";

import SearchInput from "./SearchInput";
import IssueList from "./IssueList";

import {
  Container,
  Form,
  ResultsContainer,
  Message,
} from "../styles/SearchForm.styles";
import useSearchForm from "../hooks/SearchFormHooks";

const SearchForm: React.FC = () => {
  const {
    issues,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    status,
    setStatus,
    containerRef,
  } = useSearchForm();

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
        {error && <Message>Something went wrong. Please try again.</Message>}
        <ResultsContainer ref={containerRef}>
          <IssueList issues={issues} />
        </ResultsContainer>
      </Form>
    </Container>
  );
};

export default SearchForm;
