export interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  status: string;
  setStatus: (status: string) => void;
}

export interface IssueItemProps {
  issue: {
    number: number;
    title: string;
    url: string;
    state: string;
  };
}

export interface IssueListProps {
  issues: IssueItemProps[];
}
