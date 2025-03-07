import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./ApolloClient";

import SearchForm from "./components/SearchForm";
import NotFoundPage from "./components/NotFoundPage";
import DetailsPage from "./components/DetailsPage";

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <h1>GitHub Issues Search</h1>
      <Router>
        <Routes>
          <Route path="/result/:issueNumber" element={<DetailsPage />} />
          <Route path="/" element={<SearchForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;
