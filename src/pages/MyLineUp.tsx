import { format } from "date-fns";
import { FC } from "react";
import styled from "styled-components";
import { GigDetail } from "../components/myLineUp/GigDetail";
import { BottomNavigation } from "../components/navigation/BottomNavigation";
import { Header } from "../components/navigation/Header";
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

  // TODO view as schedule
  return (
    <>
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
    100vh - ${sizes.bottomNavigationHeight} - ${sizes.pageHeaderHeight}
  );
  overflow: scroll;
  display: flex;
  gap: 5px;
  flex-direction: column;
`;

const EmptyContainer = styled.div`
  height: calc(
    100vh - ${sizes.bottomNavigationHeight} - ${sizes.pageHeaderHeight}
  );
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    color: white;
  }
`;

const GigListItem = styled.div`
  background-color: ${({ theme }) => theme.slotBackground};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.background};
  padding: 10px 0;

  p {
    color: ${({ theme }) => theme.slotText};
    text-align: center;
    margin: 0;
  }
`;
