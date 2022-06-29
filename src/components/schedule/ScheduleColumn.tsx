import { FC } from "react";
import styled from "styled-components";
import { StageFull } from "../../interfaces/data";
import { calculateGridRows, calculateSlotHeight } from "../../lib/calculate";
import { useCurrentDay } from "../../lib/hooks/useCurrentDay";
import { ScheduleSlot } from "./ScheduleSlot";
import { ScheduleTimeline } from "./ScheduleTimeline";

interface ScheduleColumnProps {
  stage: StageFull;
}

export const ScheduleColumn: FC<ScheduleColumnProps> = ({ stage }) => {
  const currentDay = useCurrentDay()!;

  return (
    <Column>
      <Header>
        <p>{stage.name}</p>
      </Header>
      <ScheduleBody
        rows={calculateGridRows(
          new Date(currentDay.start),
          new Date(currentDay.end)
        )}
      >
        {stage.gigs.map((gig, key) => (
          <ScheduleSlot key={key} band={gig} />
        ))}
        <ScheduleTimeline />
      </ScheduleBody>
    </Column>
  );
};

const Column = styled.div`
  min-width: 200px;
`;

const Header = styled.div`
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 100;
  color: black;
  padding: 10px;
  border-right: 1px solid #474747;
  p {
    margin: 0;
    text-align: center;
  }
`;

interface ScheduleBodyProps {
  rows: number;
}

const ScheduleBody = styled.div<ScheduleBodyProps>`
  display: grid;
  grid-template-rows: repeat(${({ rows }) => rows}, ${calculateSlotHeight()});
`;
