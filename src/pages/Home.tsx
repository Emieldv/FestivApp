import { FC } from "react";
import styled from "styled-components";
import { BottomNavigation } from "../components/navigation/BottomNavigation";
import { calculateTimeFrame } from "../lib/scheduleCalc";
import { sizes } from "../lib/constants";
import { useData } from "../lib/hooks/useData";
import banner from "../assets/banner-alcatraz.jpeg";
import { useNextLikedGig } from "../lib/hooks/useNextGig";
import { Timer } from "../components/home/Timer";
import { NextGig } from "../components/home/NextGig";
import { EndMessage } from "../components/home/EndMessage";

export const Home: FC = () => {
  const nextGig = useNextLikedGig();
  const { rawData } = useData();

  const { future, present, past } = calculateTimeFrame(
    new Date(rawData.days[0].start),
    new Date(rawData.days.at(-1)!.end)
  );

  return (
    <>
      <Container>
        <Banner>
          <img src={banner} alt="Banner" />
        </Banner>
        {future && <Timer />}
        {present && nextGig && <NextGig nextGig={nextGig} />}
        {past && <EndMessage />}
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
