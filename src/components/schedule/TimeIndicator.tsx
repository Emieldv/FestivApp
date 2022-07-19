import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { calculateGridPosition } from "../../lib/scheduleCalc";
import { useSelectedDay } from "../../lib/hooks/useCurrentDay";

export const TimeIndicator = () => {
  const currentDay = useSelectedDay()!;

  const calculatePosition = () => {
    const [start] = calculateGridPosition(
      { start: new Date(currentDay.start) },
      { start: new Date(), end: new Date() }
    );

    return start;
  };

  const [position, setPosition] = useState(calculatePosition());
  const lineRef = useRef<any>();

  // Recalculate the position of the timeIndicator every minute
  useEffect(() => {
    lineRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });

    const interval = setInterval(() => {
      setPosition(calculatePosition());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return <Line ref={lineRef} start={position} />;
};
const Line = styled.div<{ start: number }>`
  z-index: 30;
  height: 2px;
  background-color: red;
  grid-area: ${({ start }) => start + 1} / 1;
`;
