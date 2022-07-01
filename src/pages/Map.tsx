import { FC } from "react";
import styled from "styled-components";
import { BottomNavigation } from "../components/navigation/BottomNavigation";
import { sizes } from "../lib/constants";
//@ts-ignore
import { MapInteractionCSS } from "react-map-interaction";
import { Header } from "../components/navigation/Header";

export const Map: FC = () => {
  // TODO get map from airtable

  return (
    <>
      <Header title="Festival map" />
      <Container>
        <MapInteractionCSS minScale="0.5" maxScale="2">
          <Img src={process.env.PUBLIC_URL + "/map.jpeg"} alt="Map" />
        </MapInteractionCSS>
      </Container>
      <BottomNavigation />
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(
    100vh - ${sizes.bottomNavigationHeight} - ${sizes.pageHeaderHeight}
  );
`;

const Img = styled.img`
  height: calc(
    100vh - ${sizes.bottomNavigationHeight} - ${sizes.pageHeaderHeight}
  );
  margin: auto;
  transform: translateX(-25%);

  @media screen and (min-width: 40em) and (max-width: 63.9375em) {
    transform: translateX(0);
  }

  @media screen and (min-width: 64em) {
    transform: translateX(50%);
  }
`;
