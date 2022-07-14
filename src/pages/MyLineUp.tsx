import { format } from "date-fns";
import { FC } from "react";
import styled from "styled-components";
import { ErrorScreen } from "../components/ErrorScreen";
import { BottomNavigation } from "../components/navigation/BottomNavigation";
import { Header } from "../components/navigation/Header";
import { Gig, Stage } from "../interfaces/data";
import { colors, sizes } from "../lib/constants";
import { useCurrentDay } from "../lib/hooks/useCurrentDay";
import { useData } from "../lib/hooks/useData";
import { useStorage } from "../lib/hooks/useStorage";

interface ILikedGigs extends Gig {
  stageData: Stage;
}

export const LineUp: FC = () => {
  const { rawData } = useData();
  const day = useCurrentDay();
  const { likes } = useStorage();

  if (!day) {
    return <ErrorScreen error="Error | Line up not found" />;
  }

  const likedGigs: ILikedGigs[] = day.gigs
    .filter((gig) => likes.data.includes(gig))
    .map((gig) => {
      const gigData = rawData.gigs.find((data) => data.id === gig)!;
      const stage = rawData.stages.find(
        (stage) => stage.id === gigData.stage[0]
      )!;
      return {
        ...gigData,
        stageData: stage,
      };
    })
    .sort((x, y) => new Date(x.start).getTime() - new Date(y.start).getTime());

  // TODO view as schedule
  return (
    <>
      <Header title="My line Up" url="/lineup" select />
      <Container>
        {likedGigs.map((gig, index) => (
          <GigListItem key={index}>
            <p>{gig.name}</p>
            <p>{format(new Date(gig!.start), "HH:mm")}</p>
            <p>{gig.stageData.name}</p>
          </GigListItem>
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

  p {
    margin: 0;
    color: white;
  }
`;

const GigListItem = styled.div`
  background-color: ${colors.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid ${colors.dark};
  padding: 10px 0;

  p {
    color: ${colors.lightest};
    text-align: center;
  }
`;
