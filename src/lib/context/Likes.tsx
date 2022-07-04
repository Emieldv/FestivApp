import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { ILikesContext } from "../../interfaces/data";

export const LikesContext = createContext<ILikesContext | undefined>(undefined);

interface LikesProviderProps {
  children: ReactNode;
}

export const LikesProvider: FC<LikesProviderProps> = ({ children }) => {
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
    <LikesContext.Provider
      value={{
        likes,
        addLike,
        removeLike,
      }}
    >
      {children}
    </LikesContext.Provider>
  );
};
