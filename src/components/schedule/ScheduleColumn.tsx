import { FC } from "react";
import styled from "styled-components";
import { StageFull } from "../../interfaces/data";
import { calculateGridRows, calculateSlotHeight } from "../../lib/calculate";
import { sizes } from "../../lib/constants";
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
  min-width: 60px;
`;

const Header = styled.div`
  background-color: ${({ theme }) => theme.secondary};
  position: sticky;
  top: 0;
  z-index: 100;
  color: ${({ theme }) => theme.lightest};
  border-right: 1px solid ${({ theme }) => theme.dark};
  height: ${sizes.scheduleHeaderHeight};

  display: flex;
  align-items: center;
  justify-content: center;

  p {
    margin: 0;
    text-align: center;
    font-weight: 600;
    font-size: 22px;
    padding-top: 3px;
  }
`;

interface ScheduleBodyProps {
  rows: number;
}

const ScheduleBody = styled.div<ScheduleBodyProps>`
  display: grid;
  grid-template-rows: repeat(${({ rows }) => rows}, ${calculateSlotHeight()});
`;
