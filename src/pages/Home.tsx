import { differenceInSeconds } from "date-fns";
import { FC, useEffect, useState } from "react";
import { Facebook, Instagram, Twitter } from "react-feather";
import styled from "styled-components";
import { BottomNavigation } from "../components/navigation/BottomNavigation";
import { calculateTimeFrame } from "../lib/calculate";
import { colors, sizes } from "../lib/constants";
import { useData } from "../lib/hooks/useSchedule";
import { secondsToTime } from "../lib/timer";

// TODO Make data come from airtable

export const Home: FC = () => {
  const { rawData } = useData();
  const [timer, setTimer] = useState({
    d: 0,
    h: 2,
    m: 3,
    s: 4,
  });

  const { future, present, past } = calculateTimeFrame(
    new Date(rawData.days[0].start),
    new Date(rawData.days.at(-1)!.end)
  );

  const checkTime = () => {
    if (future) {
      const timerData = secondsToTime(
        differenceInSeconds(new Date(rawData.days[0].start), new Date())
      );

      setTimer(timerData);
    }
  };

  useEffect(() => {
    checkTime();

    setInterval(checkTime, 1000);

    return clearInterval();
  }, []);

  return (
    <>
      <Container>
        <Banner>
          <img src={process.env.PUBLIC_URL + "/banner.jpeg"} alt="Banner" />
        </Banner>
        {future && (
          // TODO insert festival name dynamically
          <>
            <Title>Time until Alcatraz</Title>
            <Timer>
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
            </Timer>
          </>
        )}
        {/* TODO */}
        {present && (
          <NextGig>
            <p>next gig at ...</p>
          </NextGig>
        )}
        {/* TODO */}
        {past && (
          <EndMessage>
            <p>Thanks for coming</p>
          </EndMessage>
        )}
      </Container>
      <BottomNavigation />
    </>
  );
};

const Container = styled.div`
  height: calc(100vh - ${sizes.bottomNavigationHeight});
  color: white;

  p {
    margin: 0;
  }
`;

const Banner = styled.div`
  height: 200px;
  width: 100vw;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const Title = styled.h2`
  background-color: ${colors.primary};
  color: ${colors.lightest};
  width: 100vw;
  margin: 0;
  padding: 10px 0;
  text-align: center;
  font-size: 32px;
`;

const Timer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100vw;
  background-color: ${colors.secondary};
  color: ${colors.lightest};

  div {
    width: 100%;
    height: 100%;
    border-right: 1px solid ${colors.dark};
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

const NextGig = styled.div`
  height: 100px;
  width: 100vw;
  background-color: ${colors.secondary};
  color: ${colors.lightest};
`;

const EndMessage = styled.div`
  height: 100px;
  width: 100vw;
  background-color: ${colors.secondary};
  color: ${colors.lightest};
`;
