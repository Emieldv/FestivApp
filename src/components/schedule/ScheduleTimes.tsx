import { FC } from "react";
import styled from "styled-components";
import {
  calculateGridRows,
  calculateSlotHeight,
  calculateTimelines,
} from "../../lib/calculate";
import { useCurrentDay } from "../../lib/hooks/useCurrentDay";
import { ScheduleTimeline } from "./ScheduleTimeline";

export const ScheduleTimes: FC = (params) => {
  const day = useCurrentDay()!;
  const timelines = calculateTimelines(day);

  return (
    <Column>
      {timelines.map((item, key) => (
        <Hour key={key}>
          {item.map((color, key) => (
            <>
              <HalfHour key={key} color={color} />
              {item.length - 1 === key && (
                <Label className="label">
                  <p>22:00</p>
                </Label>
              )}
            </>
          ))}
        </Hour>
      ))}
    </Column>
  );
};

const Column = styled.div`
  position: sticky;
  left: 0;
  margin-top: 38.4px;
  min-width: 80px;
  z-index: 100;
`;

const Hour = styled.div`
  position: relative;
  :last-child .label {
    display: none;
  }
`;

const HalfHour = styled.div<{ color: string }>`
  height: 60px;
`;

const Label = styled.div`
  padding: 10px 5px;
  background-color: white;
  position: absolute;
  bottom: 0;
  transform: translateY(50%);
  p {
    margin: 0;
  }
`;
