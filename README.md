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
- Dynamic Search (real time search) VS Submit-based Search
    - Debouncing
- Exact or loose matching in the search term
- Scroll-based Pagination
- Fetching Strategy for Detail Page
    - If users navigate from Home, reuse the data and only fetch comments
    - If users directly access to this page, fetch both the issue and comments 

## Things to improve 
- Implement a loading skeleton UI
- Persist state when navigating back to Home from Detail to prevent redundant calls
- Caching for commonly used search terms
