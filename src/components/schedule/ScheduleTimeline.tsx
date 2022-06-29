import { FC } from "react";
import styled from "styled-components";
import { calculateTimelines } from "../../lib/calculate";
import { useCurrentDay } from "../../lib/hooks/useCurrentDay";

export const ScheduleTimeline: FC = () => {
  const day = useCurrentDay()!;
  const timelines = calculateTimelines(day);

  return (
    <Container>
      {timelines.map((item, key) => (
        <Hour key={key}>
          {item.map((color, key) => (
            <HalfHour key={key} color={color} />
          ))}
        </Hour>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: fit-content;
  z-index: 10;
`;

const Hour = styled.div`
  border-top: 1px solid #eee;
`;

const HalfHour = styled.div<{ color: string }>`
  height: 59px;
  background-color: ${({ color }) =>
    color === "light" ? "#808080" : "#494949"};

  :nth-child(2) {
    border-top: 1px solid #eeeeee20;
  }
`;
