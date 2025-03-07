import {
  ResultsItem,
  ResultsList,
  StyledLink,
} from "../styles/SearchForm.styles";

interface IssueItemProps {
  issue: {
    number: number;
    title: string;
    url: string;
    state: string;
  };
}

interface IssueListProps {
  issues: IssueItemProps[];
}

const IssueList: React.FC<IssueListProps> = ({ issues }) => {
  return (
    <ResultsList>
      {issues.map((edge: any) => (
        <ResultsItem key={edge.node.number}>
          <a href={edge.node.url} target="_blank" rel="noopener noreferrer">
            {edge.node.title}
          </a>
          <p>Status: {edge.node.state}</p>
          <StyledLink to={`/result/${edge.node.number}`} state={edge.node}>
            View Issue
          </StyledLink>
        </ResultsItem>
      ))}
    </ResultsList>
  );
};

export default IssueList;
