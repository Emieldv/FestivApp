import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { IStorageContext } from "../../interfaces/data";

export const StorageContext = createContext<IStorageContext | undefined>(
  undefined
);

interface StorageProviderProps {
  children: ReactNode;
}

export const StorageProvider: FC<StorageProviderProps> = ({ children }) => {
  const [likes, setLikes] = useState<string[]>([]);

  // Get likes from storage at mount
  useEffect(() => {
    const storage = localStorage.getItem("likes");

    if (storage) {
      setLikes(JSON.parse(storage));
    }
  }, []);

  const addLike = (id: string) => {
    const update = [...likes, id];
    localStorage.setItem("likes", JSON.stringify(update));
    setLikes(update);
  };

  const removeLike = (id: string) => {
    const update = likes.filter((like) => like !== id);
    localStorage.setItem("likes", JSON.stringify(update));
    setLikes(update);
  };

  return (
    <StorageContext.Provider
      value={{
        likes: {
          data: likes,
          addLike,
          removeLike,
        },
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
