import { FC } from "react";
import { format } from "date-fns";
import styled from "styled-components";
import { Gig } from "../../interfaces/data";
import { calculateGridPosition } from "../../lib/calculate";
import { useCurrentDay } from "../../lib/hooks/useCurrentDay";
import { colors } from "../../lib/constants";

interface ScheduleSlotProps {
  band: Gig;
}

export const ScheduleSlot: FC<ScheduleSlotProps> = ({ band }) => {
  const currentDay = useCurrentDay()!;

  const [start, end] = calculateGridPosition(
    { start: new Date(currentDay.start) },
    { start: new Date(band.start), end: new Date(band.end) }
  );
  return (
    <Slot start={start} end={end}>
      <p>{band.name}</p>
      <p>
        {format(new Date(band.start), "HH:mm")} -{" "}
        {format(new Date(band.end), "HH:mm")}
      </p>
    </Slot>
  );
};

interface SlotProps {
  start: number;
  end: number;
}

const Slot = styled.div<SlotProps>`
  background-color: black;
  padding: 10px;
  color: white;
  grid-row-start: ${({ start }) => start + 1};
  grid-row-end: ${({ end }) => end + 1};
  margin: 1px 15px 0 15px;
  z-index: 20;
  border-left: 3px solid ${colors.theme};

  p {
    margin: 0;
  }
`;
