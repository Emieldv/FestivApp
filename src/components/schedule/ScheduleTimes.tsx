import { addHours, format, startOfHour } from "date-fns";
import { FC } from "react";
import styled from "styled-components";
import { calculateTimelines } from "../../lib/calculate";
import { sizes } from "../../lib/constants";
import { useCurrentDay } from "../../lib/hooks/useCurrentDay";

export const ScheduleTimes: FC = (params) => {
  const day = useCurrentDay()!;
  const timelines = calculateTimelines(day);

  const createHourLabel = (index: number) => {
    const startHour = startOfHour(new Date(day.start));
    const hour = addHours(startHour, index + 1);

    return (
      <Label className="label">
        <p>{format(hour, "HH:mm")}</p>
      </Label>
    );
  };

  return (
    <Column>
      {timelines.map((item, key) => (
        <Hour key={key}>
          {item.map((color, index) => (
            <div key={index}>
              <HalfHour color={color} />
              {item.length - 1 === index && createHourLabel(key)}
            </div>
          ))}
        </Hour>
      ))}
    </Column>
  );
};

const Column = styled.div`
  position: sticky;
  left: 0;
  margin-top: ${sizes.scheduleHeaderHeight};
  min-width: 60px;
  z-index: 100;
`;

const Hour = styled.div`
  position: relative;
  :last-child .label {
    display: none;
  }
`;

const HalfHour = styled.div<{ color: string }>`
  height: ${sizes.hourHeight / 2}px;
`;

const Label = styled.div`
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.timestampBackground};
  position: absolute;
  bottom: 0;
  transform: translateY(50%);
  p {
    margin: 0;
    color: ${({ theme }) => theme.timestampText};
    font-size: 18px;
    padding-top: 3px;
  }
`;
