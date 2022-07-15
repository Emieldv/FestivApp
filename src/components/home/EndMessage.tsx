import { FC } from "react";
import styled from "styled-components";

export const EndMessage: FC = () => {
  return (
    <EndMessageContainer>
      <h1>Thanks for coming!</h1>
      <p>Until next year!</p>
    </EndMessageContainer>
  );
};

const EndMessageContainer = styled.div`
  height: 80px;
  width: 100vw;
  padding-top: 5px;
  background-color: ${({ theme }) => theme.timerTitleBackground};
  color: ${({ theme }) => theme.timerTitleText};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    margin: 0;
  }

  p {
    font-size: 20px;
  }
`;
