import { FC } from "react";
import styled from "styled-components";
import { ErrorScreen } from "../components/ErrorScreen";
import { BottomNavigation } from "../components/navigation/BottomNavigation";
import { TopNavigation } from "../components/navigation/TopNavigation";
import { sizes } from "../lib/constants";
import { useCurrentDay } from "../lib/hooks/useCurrentDay";

export const LineUp: FC = () => {
  const day = useCurrentDay();

  if (!day) {
    return <ErrorScreen error="Error | Line up not found" />;
  }

  return (
    <>
      <TopNavigation title="Line Up" url="/lineup" />
      <Container></Container>
      <BottomNavigation />
    </>
  );
};

const Container = styled.div`
  height: calc(
    100vh - ${sizes.bottomNavigationHeight} - ${sizes.topNavigationHeight}
  );
`;
