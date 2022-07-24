import { differenceInSeconds } from "date-fns";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useConfig } from "../../lib/hooks/useConfig";
import { useData } from "../../lib/hooks/useData";
import { secondsToTime } from "../../lib/timerCalc";

export const Timer: FC = () => {
  const { festivalName } = useConfig();
  const { rawData } = useData();

  const [timer, setTimer] = useState({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });

  const checkTime = () => {
    const timerData = secondsToTime(
      differenceInSeconds(new Date(rawData.days[0].start), new Date())
    );

    setTimer(timerData);
  };

  useEffect(() => {
    checkTime();

    setInterval(checkTime, 1000);

    return clearInterval();
  }, []);

  return (
    <>
      <Title>Time until {festivalName}</Title>
      <TimerContainer>
        <div>
          <h2>{timer.d}</h2>
          <h3>Days</h3>
        </div>
        <div>
          <h2>{timer.h}</h2>
          <h3>Hours</h3>
        </div>
        <div>
          <h2>{timer.m}</h2>
          <h3>Minutes</h3>
        </div>
        <div>
          <h2>{timer.s}</h2>
          <h3>Seconds</h3>
        </div>
      </TimerContainer>
    </>
  );
};

const Title = styled.h2`
  background-color: ${({ theme }) => theme.timerTitleBackground};
  color: ${({ theme }) => theme.timerTitleText};
  width: 100vw;
  margin: 0;
  margin-bottom: 1px;
  padding: 10px 0;
  text-align: center;
  font-size: 32px;
`;

const TimerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100vw;
  background-color: ${({ theme }) => theme.timerBackground};
  color: ${({ theme }) => theme.timerText};

  div {
    width: 100%;
    height: 100%;
    border-right: 1px solid ${({ theme }) => theme.background};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    :last-child {
      border: none;
    }

    h2 {
      margin: 0;
      font-size: 50px;
      font-weight: 600;
    }

    h3 {
      margin: 0;
      margin-top: -5px;
      font-size: 20px;
      font-weight: 500;
    }
  }
`;
