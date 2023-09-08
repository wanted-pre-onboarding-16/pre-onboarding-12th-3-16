import { createContext, useContext, useState } from 'react';

type Prop = {
  children: React.ReactNode;
};

interface DisplayListContextType {
  isFocused: boolean;
  isWriting: (isExist: string) => void;
}

const DisplayListContext = createContext<DisplayListContextType | null>(null);

export const useDisplay = () => useContext(DisplayListContext);

export function DisplayProvider({ children }: Prop) {
  const [isFocused, setIsFocused] = useState(false);
  const isWriting = (isExist: string) => {
    if (isExist === 'focus') {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
  };

  return (
    <DisplayListContext.Provider value={{ isFocused, isWriting }}>
      {children}
    </DisplayListContext.Provider>
  );
}
