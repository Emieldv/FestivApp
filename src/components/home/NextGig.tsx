import { MusicNoteIcon } from "@heroicons/react/solid";
import { format, formatDistanceToNow } from "date-fns";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { GigFull } from "../../interfaces/data";

export const NextGig: FC<{ nextGig: GigFull }> = ({ nextGig }) => {
  const calculateDistance = () => {
    return formatDistanceToNow(new Date(nextGig.start));
  };

  const [distance, setDistance] = useState(calculateDistance());

  useEffect(() => {
    const interval = setInterval(() => {
      setDistance(calculateDistance());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <SmallTitle>
        <h2>Next gig:</h2>
        <p>In {distance}</p>
      </SmallTitle>
      <NextGigContainer>
        <div>
          <h3>{nextGig.name}</h3>
          <div>
            <p>{nextGig.stage.name}</p>
            <p>
              {format(new Date(nextGig.start), "EEE, d LLL. HH:mm")} -{" "}
              {format(new Date(nextGig.end), "HH:mm")}
            </p>
          </div>
        </div>
        <Icon />
      </NextGigContainer>
    </>
  );
};

const NextGigContainer = styled.div`
  background-color: ${({ theme }) => theme.timerBackground};
  color: ${({ theme }) => theme.timerText};
  padding: 15px;

  display: flex;
  justify-content: space-between;
  justify-items: center;

  div {
    h3 {
      margin: 0;
      color: ${({ theme }) => theme.timerTitleBackground};
      font-size: 28px;
    }

    div {
      display: flex;

      p {
        font-size: 22px;
      }

      p:first-child {
        padding-right: 10px;
        font-weight: 500;
      }

      p:last-child {
        word-spacing: 2px;
        font-weight: 300;
      }
    }
  }
`;

const SmallTitle = styled.div`
  background-color: ${({ theme }) => theme.timerTitleBackground};
  color: ${({ theme }) => theme.timerTitleText};
  padding: 10px 15px 5px 15px;

  display: flex;
  justify-content: space-between;
  align-items: baseline;

  h2 {
    font-size: 25px;
    margin: 0;
  }

  p {
    font-size: 20px;
  }
`;

const Icon = styled(MusicNoteIcon)`
  height: 50px;
  margin: auto 0;
`;
