import { FC } from "react";
import styled from "styled-components";
import { BottomNavigation } from "../components/navigation/BottomNavigation";
import { breakpoints, sizes } from "../lib/constants";
//@ts-ignore
import { MapInteractionCSS } from "react-map-interaction";
import { Header } from "../components/navigation/Header";
import { useData } from "../lib/hooks/useData";
import { TopNavigation } from "../components/navigation/Topnavigation";

export const Map: FC = () => {
  const { config } = useData();

  return (
    <>
      <TopNavigation />
      <Header title="Festival map" />
      <Container>
        <MapInteractionCSS minScale={0.5} maxScale={2}>
          <Img src={config.map} alt="Map" />
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
    100vh - ${sizes.mainNavigationHeight} - ${sizes.pageHeaderHeight}
  );

  @media screen and (min-width: ${breakpoints.tabletPortrait}) {
    height: calc(100vh - ${sizes.mainNavigationHeight});
  }
`;

const Img = styled.img`
  height: calc(
    100vh - ${sizes.mainNavigationHeight} - ${sizes.pageHeaderHeight}
  );
  margin: auto;

  @media screen and (min-width: ${breakpoints.tabletPortrait}) {
    height: calc(100vh - ${sizes.mainNavigationHeight});
  }

  @media screen and (min-width: ${breakpoints.tabletPortrait}) and (max-width: ${breakpoints.tabletLandscape}) {
    transform: translateX(25%);
  }

  @media screen and (min-width: ${breakpoints.tabletLandscape}) {
    transform: translateX(50%);
  }
`;
