import styled from "styled-components";
import { ErrorScreen } from "../components/ErrorScreen";
import { BottomNavigation } from "../components/navigation/BottomNavigation";
import { TopNavigation } from "../components/navigation/TopNavigation";
import { ScheduleColumn } from "../components/schedule/ScheduleColumn";
import { ScheduleTimes } from "../components/schedule/ScheduleTimes";
import { sizes } from "../lib/constants";
import { useCurrentDay } from "../lib/hooks/useCurrentDay";

export const Schedule = () => {
  const day = useCurrentDay();

  if (!day) {
    return <ErrorScreen error="Error | Schedule not found" />;
  }

  return (
    <>
      <TopNavigation title="Schedule" url="/schedule" />
      <Container>
        <ScheduleContainer columns={day.stages.length}>
          <ScheduleTimes />
          <ScheduleColumn
            stage={{ createdTime: "ss", id: "ss", name: "", gigs: [] }}
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
    100vh - ${sizes.topNavigationHeight} - ${sizes.bottomNavigationHeight}
  );
`;

interface ScheduleContainerProps {
  columns: number;
}

const ScheduleContainer = styled.div<ScheduleContainerProps>`
  min-width: calc(${({ columns }) => columns} * 200px);
  display: grid;
  grid-template-columns: 0px 60px repeat(${({ columns }) => columns}, 1fr);
`;
