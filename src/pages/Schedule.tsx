import styled from "styled-components";
import { ErrorScreen } from "../components/ErrorScreen";
import { BottomNavigation } from "../components/navigation/BottomNavigation";
import { Header } from "../components/navigation/Header";
import { ScheduleColumn } from "../components/schedule/ScheduleColumn";
import { ScheduleTimes } from "../components/schedule/ScheduleTimes";
import { sizes } from "../lib/constants";
import { useCurrentDay } from "../lib/hooks/useCurrentDay";

export const Schedule = () => {
  const day = useCurrentDay();

  if (!day) {
    return <ErrorScreen error="Error | Schedule not found" />;
  }

  // TODO add time indicator

  return (
    <>
      <Header title="Schedule" url="/schedule" select />
      <Container>
        <ScheduleContainer columns={day.stages.length}>
          <ScheduleTimes />
          {/* Empty schedule column behind timestamps */}
          <ScheduleColumn
            stage={{
              createdTime: Date.now().toString(),
              id: "FakeID",
              name: "",
              gigs: [],
            }}
          />
          {day.stages.map((stage, key) => (
            <ScheduleColumn key={key} stage={stage} />
          ))}
        </ScheduleContainer>
      </Container>
      <BottomNavigation />
    </>
  );
};

const Container = styled.div`
  overflow: scroll;
  height: calc(
    100vh - ${sizes.pageHeaderHeight} - ${sizes.bottomNavigationHeight}
  );
`;

interface ScheduleContainerProps {
  columns: number;
}

const ScheduleContainer = styled.div<ScheduleContainerProps>`
  min-width: ${({ columns }) =>
    columns > 2 ? (columns * 200).toString() + "px" : "100vw"};
  display: grid;
  grid-template-columns: 0px 60px repeat(${({ columns }) => columns}, 1fr);
`;
