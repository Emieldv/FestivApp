import { useNavigate, useParams } from "react-router-dom";
import { useData } from "./useData";

export function useSelectedDay() {
  const navigate = useNavigate();
  const { data } = useData();
  const { dayId } = useParams();

  if (!dayId) {
    throw new Error("No dayId present");
  }

  const today = data.days.find((day) => day.id === dayId);

  if (!today) {
    navigate("/");
    return null;
  }

  return today;
}
