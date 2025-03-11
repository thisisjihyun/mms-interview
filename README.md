## MediaMarktSturn Interview _ Jihyun Hwang

## Available Scripts
### `npm run start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser
### `npm run test`
### `npm run build`

## Routes
- / -  Home
- /result/:issueNumber - Detail page
- Any other path - 404 page

## Decision logs
1. Search 
- Dynamic Search (real time search) VS Submit-based Search
    - Debouncing
- Exact or loose matching in the search term

2. Pagination
- Scroll-based Pagination for both a list of issues and comments (Reusuable hooks)
- Fetching Strategy for Detail Page
    - If users navigate from Home, reuse the data and only fetch comments (e.g. query GetComments)
    - If users directly access to this page, fetch both the issue and comments

3. Modularize into separate hook and UI components

## Things to improve 
- Implement a loading skeleton UI
- Persist state when navigating back to Home from Detail to prevent redundant calls
- Caching for commonly used search terms
- Add unit and E2E test
