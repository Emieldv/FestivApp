import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ErrorScreen } from "../components/ErrorScreen";
import { ScheduleColumn } from "../components/schedule/ScheduleColumn";
import { ScheduleTimes } from "../components/schedule/ScheduleTimes";
import { useSchedule } from "../lib/hooks/useSchedule";

export const Schedule = () => {
  const { data } = useSchedule();
  const { scheduleId } = useParams();
  const day = data.days.find((day) => day.id === scheduleId);

  if (!day) {
    return <ErrorScreen error="Error: Schedule not found" />;
  }

  return (
    <Container>
      <ScheduleContainer columns={day.stages.length}>
        <ScheduleTimes />
        {day.stages.map((stage, key) => (
          <ScheduleColumn key={key} stage={stage} />
        ))}
      </ScheduleContainer>
    </Container>
  );
};

const Container = styled.div`
  overflow: scroll;
  height: 100vh;
`;

interface ScheduleContainerProps {
  columns: number;
}

const ScheduleContainer = styled.div<ScheduleContainerProps>`
  min-width: calc(${({ columns }) => columns} * 200px);
  display: grid;
  grid-template-columns: 0px repeat(${({ columns }) => columns}, auto);
`;
