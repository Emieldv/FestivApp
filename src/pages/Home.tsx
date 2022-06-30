import { FC } from "react";
import styled from "styled-components";
import { BottomNavigation } from "../components/navigation/BottomNavigation";
import { sizes } from "../lib/constants";

export const Home: FC = () => {
  return (
    <>
      <Container>
        <p>Banner</p>
        <p>20 days until Alcatraz</p>
        <p>External links?</p>
        <p>extra filler content</p>
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
