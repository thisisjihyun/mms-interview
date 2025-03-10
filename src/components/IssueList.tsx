import {
  ResultsItem,
  ResultsList,
  StyledLink,
} from "../styles/SearchForm.styles";
import { IssueListProps } from "../types";
import { getTimeAgo } from "../utils/getTimeAgo";

const IssueList: React.FC<IssueListProps> = ({ issues }) => {
  return (
    <ResultsList>
      {issues.map(({ node }: any, index) => {
        const { number, title, url, state, createdAt, author } = node;
        return (
          <ResultsItem key={index}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
            <p>Status: {state}</p>
            <p>
              #{number} {author.login}{" "}
              {state === "OPEN" ? "opened" : "was closed"} by {""}
              {getTimeAgo(createdAt)}
            </p>
            <StyledLink to={`/result/${number}`} state={node}>
              View Issue
            </StyledLink>
          </ResultsItem>
        );
      })}
    </ResultsList>
  );
};

export default IssueList;
