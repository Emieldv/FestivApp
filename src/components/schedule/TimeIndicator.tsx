import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { calculateGridPosition } from "../../lib/scheduleCalc";
import { useSelectedDay } from "../../lib/hooks/useCurrentDay";

export const TimeIndicator = () => {
  const currentDay = useSelectedDay()!;

  const [position, setPosition] = useState(1000);
  const lineRef = useRef<any>();

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

    // Wait for the ref to mount
    setTimeout(() => {
      lineRef.current &&
        lineRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
    }, 100);

    const interval = setInterval(() => {
      calculatePosition();
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
