export const colors = {
  primary: "#bf8761",
  secondary: "#3b322e",
  dark: "#110e13",
  lessDark: "#151416",
  lightest: "#fee5d6",
  white: "#ffffff",
  error: "#e92f48",
  timelineDark: "#3f3e41",
  timelineLight: "#58575b",
};

export const sizes = {
  hourHeight: 180,
  slotSize: parseInt(process.env.REACT_APP_SLOT_SIZE || "5") || 5,
  topNavigationHeight: "50px",
  scheduleHeaderHeight: "40px",
  bottomNavigationHeight: "60px",
};
