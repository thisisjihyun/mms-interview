import { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { GET_ISSUES } from "../graphql/queries";

const useSearchForm = () => {
  const [status, setStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedTerm, setDebouncedTerm] = useState<string>("");
  const [issues, setIssues] = useState<any[]>([]);
  const [afterCursor, setAfterCursor] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Debounce the search term to prevent too many requests
  useEffect(() => {
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
    nextFetchPolicy: "cache-first",
  });

  // Update issues when data is fetched
  useEffect(() => {
    if (data?.search?.edges) {
      setIssues((prevIssues) => [...prevIssues, ...data.search.edges]);
    }
  }, [data]);

  const loadMore = () => {
    if (data?.search?.pageInfo?.hasNextPage) {
      const newCursor = data.search.pageInfo.endCursor;
      setAfterCursor((prevCursor) =>
        prevCursor === newCursor ? prevCursor : newCursor
      );
    }
  };

  // Handle scroll to load more issues
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

  return {
    issues,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    status,
    setStatus,
    containerRef,
  };
};

export default useSearchForm;
