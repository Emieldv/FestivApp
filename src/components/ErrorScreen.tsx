import { FC } from "react";
import styled from "styled-components";

interface ErrorScreenProps {
  error: string;
}

export const ErrorScreen: FC<ErrorScreenProps> = ({ error }) => {
  return (
    <Container>
      <ErrorContainer>
        <ErrorText>{error}</ErrorText>
      </ErrorContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorContainer = styled.div`
  padding: 20px 10px;
  background-color: ${({ theme }) => theme.error};
  border-radius: 10px;
  width: 280px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const ErrorText = styled.p`
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  margin: 0;
  color: ${({ theme }) => theme.white};
`;
