import { FC } from "react";
import styled from "styled-components";

interface ScheduleSlotProps {
  band: any;
}

export const ScheduleSlot: FC<ScheduleSlotProps> = ({ band }) => {
  return (
    <Slot>
      <p>BandName</p>
    </Slot>
  );
};

const Slot = styled.div`
  background-color: black;
  padding: 10px;
  color: white;
  grid-row-start: 4;
  grid-row-end: 16;
  margin: 0 10px;
  p {
    margin: 0;
  }
`;
