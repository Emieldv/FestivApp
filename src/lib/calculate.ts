import {
  differenceInMinutes,
  isFuture,
  isPast,
  isWithinInterval,
  startOfHour,
} from "date-fns";
import { Day } from "../interfaces/data";
import { sizes } from "./constants";

export function calculateGridRows(start: Date, end: Date) {
  return Math.ceil(differenceInMinutes(end, start) / sizes.slotSize);
}

export function calculateGridPosition(
  day: { start: Date },
  slot: { start: Date; end: Date }
) {
  const gigSlotAmount = calculateGridRows(slot.start, slot.end);
  const slotStart = calculateGridRows(day.start, slot.start);
  const slotEnd = slotStart + gigSlotAmount;

  return [slotStart, slotEnd];
}

export function calculateTimelines(day: Day) {
  const hours = Math.ceil(
    differenceInMinutes(new Date(day.end), new Date(day.start)) / 60
  );

  let array = [];

  for (let i = 0; i <= hours; i++) {
    const createArray = (color: string) => {
      if (
        (i === 0 && startOfHour(new Date(day.start)) !== new Date(day.start)) ||
        (i === hours && startOfHour(new Date(day.end)) !== new Date(day.end))
      ) {
        return [color];
      } else {
        return [color, color];
      }
    };

    if (i % 2) {
      array.push(createArray("light"));
    } else {
      array.push(createArray("dark"));
    }
  }

  return array;
}

export function calculateSlotHeight() {
  const slotsPerHour = 60 / sizes.slotSize;
  const slotHeight = sizes.hourHeight / slotsPerHour;
  return slotHeight.toString() + "px";
}

export function calculateTimeFrame(start: Date, end: Date) {
  return {
    future: isFuture(start),
    present: isWithinInterval(new Date(), {
      start: start,
      end: end,
    }),
    past: isPast(end),
  };
}
