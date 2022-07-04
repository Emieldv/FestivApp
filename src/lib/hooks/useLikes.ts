import { useContext } from "react";
import { LikesContext } from "../context/Likes";

export function useLikes() {
  const likesContext = useContext(LikesContext);
  if (!likesContext) {
    throw new Error("No likesProvider detected");
  }

  return likesContext;
}
