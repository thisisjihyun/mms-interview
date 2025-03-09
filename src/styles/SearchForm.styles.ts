import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: whitesmoke;
`;

export const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex: 1;
  flex-direction: column;
  max-height: 80vh;
  width: 80%;
  overflow: hidden;
`;

export const Label = styled.label`
  margin: 0 0.5rem;
`;

const baseInputStyles = css`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Input = styled.input`
  ${baseInputStyles}
  width: 40%;
`;

export const Select = styled.select`
  ${baseInputStyles}
  width: auto;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  background-color: green;
  padding: 0.5rem;
  border-radius: 5px;

  &:hover {
    background-color: lightgreen;
  }
`;

export const Message = styled.p`
  text-align: center;
`;

export const ResultsContainer = styled.div`
  overflow-y: auto;
`;

export const ResultsList = styled.ul`
  padding-left: 0;
`;

export const ResultsItem = styled.li`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
`;
