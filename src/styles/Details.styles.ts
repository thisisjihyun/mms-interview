import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  padding: 0 5rem;
  margin: 0;
  height: 100%;
  min-height: 100vh;

  @media (max-width: 375px) {
    padding: 0 2rem;
`;

export const CommentsContainer = styled.div`
  overflow-y: auto;
  max-height: 60vh;
`;
