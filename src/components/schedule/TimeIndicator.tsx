import { useEffect, useState } from "react";
import styled from "styled-components";
import { calculateGridPosition } from "../../lib/calculate";
import { useCurrentDay } from "../../lib/hooks/useCurrentDay";

export const TimeIndicator = () => {
  const currentDay = useCurrentDay()!;

  const [position, setPosition] = useState(1);

  const calculatePosition = () => {
    const [start] = calculateGridPosition(
      { start: new Date(currentDay.start) },
      { start: new Date(), end: new Date() }
    );

    setPosition(start);
  };

  // Recalculate the position of the timeIndicator every minute
  useEffect(() => {
    calculatePosition();

    const interval = setInterval(() => {
      calculatePosition();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return <Line start={position} />;
};
const Line = styled.div<{ start: number }>`
  z-index: 30;
  height: 2px;
  background-color: red;
  grid-area: ${({ start }) => start + 1} / 1;
`;
