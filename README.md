## MediaMarktSturn Interview _ Jihyun Hwang

## Available Scripts
- `npm run start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser
- `npm run test`
- `npm run build`

## Routes
- / -  Home
- /result/:issueNumber - Detail page
- Any other path - 404 page

## Demo
Users can ...
- Type text in the search box
- Select a status from the dropdown
- See a list of issues that match the search term in either the title or body
- Scroll through the list
- View a list with some information related to the search term
- See a message when no matching data is found
- Click a title to navigate to the issue
- Click a button to view more details
- See additional issue information
- View all comments in a scrollable section
- See a 404 page when accessing an unsupported URL
- Expect the same context when opening the issue in another tab


## Decision logs
1. Search 
- Dynamic search (real time search) VS Submit based Search
    - Debouncing
- Exact or loose matching in the search term
2. Pagination
- Scroll based pagination for both a list of issues and comments (Hooks)
- Fetching strategy for Detail page
    - If users navigate from Home, reuse the data and only fetch comments (e.g. query GetComments)
    - If users directly access to this page, fetch both the issue and comments (e.g. query GetIssuesAndComments)
3. Modularize into separate hook and UI components
4. Reusable functionality
    - Human redable timestamp
    - Hooks for scroll based pagination 
5. Error handling 
    - When users search for an issue that does not exist on the Detail page
    - When users search for a term that does not match any issues on the Homepage

## Things to improve 
- Implement a loading skeleton UI
- Persist state when navigating back to Home from Detail to prevent redundant calls
- Caching for commonly used search terms / Leverage Apollo Cache
- Add unit and E2E test
- Enable searchTerm with special characters (e.g. <, *, etc)
