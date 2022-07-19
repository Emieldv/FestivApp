import { BookmarkIcon } from "@heroicons/react/solid";
import { format, isPast } from "date-fns";
import { FC } from "react";
import styled from "styled-components";
import { GigFull } from "../../interfaces/data";
import { useConfig } from "../../lib/hooks/useConfig";
import { useStorage } from "../../lib/hooks/useStorage";

export const GigDetail: FC<{ gig: GigFull }> = ({ gig }) => {
  const { Colors } = useConfig();
  const { likes } = useStorage();
  const past = isPast(new Date(gig.end));

  const handleLike = () => {
    likes.removeLike(gig.id);
  };

  return (
    <NextGigContainer className={past ? "past" : ""}>
      <div>
        <h3>{gig.name}</h3>
        <div>
          <p>{gig.stage.name}</p>
          <p>
            {format(new Date(gig.start), "HH:mm")} -{" "}
            {format(new Date(gig.end), "HH:mm")}
          </p>
        </div>
      </div>
      <BookmarkIcon color={Colors.slotSelectedText} onClick={handleLike} />
    </NextGigContainer>
  );
};

const NextGigContainer = styled.div`
  background-color: ${({ theme }) => theme.timerBackground};
  color: ${({ theme }) => theme.timerText};
  padding: 15px;

  display: grid;
  grid-template-columns: auto min-content;

  svg {
    height: 25px;
    transform: scaleX(130%) scaleY(105%);
    cursor: pointer;
  }

  div {
    display: flex;
    flex-direction: column;
    h3 {
      margin: 0;
      color: ${({ theme }) => theme.timerTitleBackground};
      font-size: 25px;
    }

    div {
      display: flex;

      p {
        font-size: 20px;
        margin: 0;
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

  &.past {
    filter: opacity(75%);
  }
`;
