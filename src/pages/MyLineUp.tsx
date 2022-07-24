import { FC } from "react";
import styled from "styled-components";
import { GigDetail } from "../components/myLineUp/GigDetail";
import { BottomNavigation } from "../components/navigation/BottomNavigation";
import { Header } from "../components/navigation/Header";
import { TopNavigation } from "../components/navigation/Topnavigation";
import { sizes } from "../lib/constants";
import { useGetDayLikes } from "../lib/hooks/useGetDayLikes";

export const LineUp: FC = () => {
  const likedGigs = useGetDayLikes();

  if (!likedGigs?.length) {
    return (
      <>
        <Header title="My line Up" url="/lineup" select />
        <EmptyContainer>
          <h1>No liked gigs yet</h1>
        </EmptyContainer>
        <BottomNavigation />
      </>
    );
  }

  return (
    <>
      <TopNavigation />
      <Header title="My line Up" url="/lineup" select />
      <Container>
        {likedGigs.map((gig, index) => (
          <GigDetail key={index} gig={gig} />
        ))}
      </Container>
      <BottomNavigation />
    </>
  );
};

const Container = styled.div`
  height: calc(
    100vh - ${sizes.mainNavigationHeight} - ${sizes.pageHeaderHeight}
  );
  overflow: scroll;
  display: flex;
  gap: 5px;
  flex-direction: column;
  padding-top: 5px;

  @media screen and (min-width: 39em) {
    padding: 5px 20px;
  }
`;

const EmptyContainer = styled.div`
  height: calc(
    100vh - ${sizes.mainNavigationHeight} - ${sizes.pageHeaderHeight}
  );
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    color: white;
  }
`;
