import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const DaySelector: FC = () => {
  return (
    <Container>
      <Linker to="/schedule/reclnFiQpOFZklVoj">Friday</Linker>
      <Linker to="/schedule/rec6j70LrLYKrCoXd">Saturday</Linker>
      <Linker to="/schedule/rec6T2k9j426TXrKt">Sunday</Linker>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 4rem;
`;
const Linker = styled(Link)`
  background-color: orange;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
`;
