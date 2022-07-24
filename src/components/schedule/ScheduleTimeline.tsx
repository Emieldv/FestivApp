import { FC } from "react";
import styled from "styled-components";
import { calculateTimelines } from "../../lib/scheduleCalc";
import { useSelectedDay } from "../../lib/hooks/useCurrentDay";
import { sizes } from "../../lib/constants";
import { useConfig } from "../../lib/hooks/useConfig";
import { IColors } from "../../interfaces/data";

export const ScheduleTimeline: FC = () => {
  const { colors } = useConfig();
  const day = useSelectedDay()!;
  const timelines = calculateTimelines(day);

  return (
    <Container>
      {timelines.map((item, key) => (
        <Hour key={key}>
          {item.map((color, key) => (
            <HalfHour key={key} color={color} $colors={colors} />
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
  grid-area: 1 / 1;
`;

const Hour = styled.div`
  border-top: 1px solid ${({ theme }) => theme.hourBorder};

  :first-child {
    border: none;
  }
`;

const HalfHour = styled.div<{ color: string; $colors: IColors }>`
  height: ${sizes.hourHeight / 2 - 1}px;
  background-color: ${({ color, $colors }) =>
    color === "light" ? $colors.timelineLight : $colors.timelineDark};

  :nth-child(2) {
    border-top: 1px solid ${({ theme }) => theme.halfhourBorder};
  }
`;
