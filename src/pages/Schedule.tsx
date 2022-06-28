import styled from "styled-components";
import { useAirTable } from "../lib/hooks/useAirtable";
import { ErrorScreen } from "../components/ErrorScreen";
import { Loader } from "../components/Loader";
import { ScheduleColumn } from "../components/schedule/ScheduleColumn";
import { Stage } from "../interfaces/data";

export const Schedule = () => {
  const { data: stages, error, loading } = useAirTable("/stages");

  if (loading) return <Loader />;

  if (error) return <ErrorScreen error={error.message} />;

  return (
    <Container>
      <ScheduleContainer columns={stages.length}>
        {stages.map((stage: Stage) => (
          <ScheduleColumn stage={stage} />
        ))}
      </ScheduleContainer>
      {/* TODO add timestamps here */}
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
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, auto);
`;
