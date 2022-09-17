import { FC } from "react";
import styled from "styled-components";
import { BottomNavigation } from "../components/navigation/BottomNavigation";
import { calculateTimeFrame } from "../lib/scheduleCalc";
import { sizes } from "../lib/constants";
import { useData } from "../lib/hooks/useData";
import { useNextLikedGig } from "../lib/hooks/useNextGig";
import { Timer } from "../components/home/Timer";
import { NextGig } from "../components/home/NextGig";
import { EndMessage } from "../components/home/EndMessage";
import { TopNavigation } from "../components/navigation/Topnavigation";

export const Home: FC = () => {
  const onLine = window.navigator.onLine;
  const nextGig = useNextLikedGig();
  const { rawData, config } = useData();

  const { future, present, past } = calculateTimeFrame(
    new Date(rawData.days[0].start),
    new Date(rawData.days.at(-1)!.end)
  );

  return (
    <>
      <TopNavigation />
      <Container>
        <div>
          <Banner>
            <img src={config.banner} alt="Banner" />
          </Banner>
          {future && <Timer />}
          {present && nextGig && <NextGig nextGig={nextGig} />}
          {past && <EndMessage />}
        </div>
      </Container>
      <BottomNavigation />
      {/* This image is always hidden, by getting this image at app start it gets cached immediately by the service worker */}
      {config.map && <LoadImage src={config.map} alt="Banner" />}
    </>
  );
};

const Container = styled.div`
  height: calc(100vh - ${sizes.mainNavigationHeight});
  color: white;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 39em) {
    display: grid;
    grid-template-columns: auto 400px;
  }

  p {
    margin: 0;
  }
`;

const Banner = styled.div`
  height: 200px;
  width: 100%;

  @media screen and (min-width: 39em) {
    height: 40vh;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const LoadImage = styled.img`
  display: none;
`;
