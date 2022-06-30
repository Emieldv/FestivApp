import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ErrorScreen } from "../components/ErrorScreen";
import { TopNavigation } from "../components/navigation/TopNavigation";
import { ScheduleColumn } from "../components/schedule/ScheduleColumn";
import { ScheduleTimes } from "../components/schedule/ScheduleTimes";
import { sizes } from "../lib/constants";
import { useSchedule } from "../lib/hooks/useSchedule";

export const Schedule = () => {
  const { data } = useSchedule();
  const { scheduleId } = useParams();
  const day = data.days.find((day) => day.id === scheduleId);

  if (!day) {
    return <ErrorScreen error="Error: Schedule not found" />;
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
    </>
  );
};

const Container = styled.div`
  overflow: scroll;
  height: calc(100vh - ${sizes.navigationHeight});
`;

interface ScheduleContainerProps {
  columns: number;
}

const ScheduleContainer = styled.div<ScheduleContainerProps>`
  min-width: calc(${({ columns }) => columns} * 200px);
  display: grid;
  grid-template-columns: 0px 60px repeat(${({ columns }) => columns}, 1fr);
`;
