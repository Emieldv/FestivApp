import { useContext } from "react";
import { StorageContext } from "../context/Storage";

export function useStorage() {
  const storageContext = useContext(StorageContext);
  if (!storageContext) {
    throw new Error("No likesProvider detected");
  }

  return storageContext;
}
