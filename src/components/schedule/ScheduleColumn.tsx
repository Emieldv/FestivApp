import { FC } from "react";
import styled from "styled-components";
import { Stage } from "../../interfaces/data";
import { ScheduleSlot } from "./ScheduleSlot";

interface ScheduleColumnProps {
  stage: Stage;
}

export const ScheduleColumn: FC<ScheduleColumnProps> = ({ stage }) => {
  return (
    <Column>
      <Header>
        <p>{stage.name}</p>
      </Header>
      <ScheduleBody hours={10}>
        <ScheduleSlot band={"test"} />
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
  z-index: 20;
  color: black;
  padding: 10px;
  border-right: 1px solid #4d4d4d;
  p {
    margin: 0;
    text-align: center;
  }
`;

interface ScheduleBodyProps {
  hours: number;
}

const ScheduleBody = styled.div<ScheduleBodyProps>`
  border-right: 1px solid #4d4d4d;
  display: grid;
  grid-template-rows: repeat(${({ hours }) => hours * 12}, 10px);
`;
