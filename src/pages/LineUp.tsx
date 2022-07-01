import { FC } from "react";
import styled from "styled-components";
import { ErrorScreen } from "../components/ErrorScreen";
import { BottomNavigation } from "../components/navigation/BottomNavigation";
import { Header } from "../components/navigation/Header";
import { sizes } from "../lib/constants";
import { useCurrentDay } from "../lib/hooks/useCurrentDay";

export const LineUp: FC = () => {
  const day = useCurrentDay();

  if (!day) {
    return <ErrorScreen error="Error | Line up not found" />;
  }

  return (
    <>
      <Header title="My line Up" url="/lineup" select />
      <Container>
        <p>Personal lineup</p>
        <p>View as list view</p>
        <p>View as schedule</p>
      </Container>
      <BottomNavigation />
    </>
  );
};

const Container = styled.div`
  height: calc(
    100vh - ${sizes.bottomNavigationHeight} - ${sizes.pageHeaderHeight}
  );

  p {
    margin: 0;
    color: white;
  }
`;
