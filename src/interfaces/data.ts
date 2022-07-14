export interface IColors {
  primary: string;
  secondary: string;
  dark: string;
  lessDark: string;
  lightest: string;
  white: string;
  error: string;
  timelineDark: string;
  timelineLight: string;
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
  };
}

export interface IStorageContext {
  likes: {
    data: string[];
    addLike: (id: string) => void;
    removeLike: (id: string) => void;
  };
}
