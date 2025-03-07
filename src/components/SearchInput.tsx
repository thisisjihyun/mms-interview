import { Input, Label } from "../styles/SearchForm.styles";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  status: string;
  setStatus: (status: string) => void;
}
const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  setSearchTerm,
  status,
  setStatus,
}) => {
  return (
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
  );
};

export default SearchInput;
