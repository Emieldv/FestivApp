import { MusicNoteIcon } from "@heroicons/react/solid";
import { format } from "date-fns";
import { FC } from "react";
import styled from "styled-components";
import { GigFull } from "../../interfaces/data";

export const NextGig: FC<{ nextGig: GigFull }> = ({ nextGig }) => {
  return (
    <>
      <SmallTitle>Next gig:</SmallTitle>
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

const SmallTitle = styled.h2`
  font-size: 25px;
  padding: 10px 15px 5px 15px;
  margin: 0;
  background-color: ${({ theme }) => theme.timerTitleBackground};
  color: ${({ theme }) => theme.timerTitleText};
`;

const Icon = styled(MusicNoteIcon)`
  height: 50px;
  margin: auto 0;
`;
