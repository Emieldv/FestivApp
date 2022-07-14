export interface IColors {
  background: string;

  timerBackground: string;
  timerText: string;
  timerTitleBackground: string;
  timerTitleText: string;

  navigation: string;
  navigationIcon: string;
  navigationIconActive: string;

  scheduleHeaderBackground: string;
  scheduleHeaderText: string;

  slotBackground: string;
  slotTitle: string;
  slotText: string;
  slotSelectedBackground: string;
  slotSelectedText: string;

  timestampBackground: string;
  timestampText: string;

  timelineDark: string;
  timelineLight: string;
  hourBorder: string;
  halfhourBorder: string;
  error: string;
}

export interface Day {
  createdTime: string;
  end: string;
  id: string;
  name: string;
  start: string;
  gigs: string[];
}

export interface Stage {
  createdTime: string;
  id: string;
  name: string;
}

export interface Gig {
  createdTime: string;
  id: string;
  name: string;
  start: string;
  end: string;
  stage: string;
  day: string;
}

export interface ConfigData {
  createdTime: string;
  id: string;
  FestivalName: string;
  Colors: string;
  EnableMap: boolean;
}

export interface StageFull extends Stage {
  gigs: Gig[];
}

export interface DayFull extends Day {
  stages: StageFull[];
}

export interface IDataContext {
  rawData: {
    stages: Stage[];
    days: Day[];
    gigs: Gig[];
  };
  data: {
    days: DayFull[];
  };
  config: {
    Colors: IColors;
    FestivalName: string;
    EnableMap: boolean;
  };
}

export interface IStorageContext {
  likes: {
    data: string[];
    addLike: (id: string) => void;
    removeLike: (id: string) => void;
  };
}
