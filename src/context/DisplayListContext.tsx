import { createContext, useContext, useEffect, useRef, useState } from 'react';

type Prop = {
  children: React.ReactNode;
};

interface DisplayListContextType {
  isFocused: boolean;
  targetRef: React.RefObject<HTMLInputElement>;
}

const DisplayListContext = createContext<DisplayListContextType | null>(null);

export const useDisplay = () => useContext(DisplayListContext);

export function DisplayProvider({ children }: Prop) {
  const [isFocused, setIsFocused] = useState(false);
  const targetRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!targetRef.current) return;
    const onFocus = () => setIsFocused(true);
    const onBlur = () => setIsFocused(false);
    if (isFocused) {
      targetRef.current?.focus();
    }
    targetRef.current?.addEventListener('focus', onFocus);
    targetRef.current?.addEventListener('blur', onBlur);

    return () => {
      targetRef.current?.removeEventListener('focus', onFocus);
      targetRef.current?.removeEventListener('blur', onBlur);
    };
  }, [isFocused]);

  return (
    <DisplayListContext.Provider value={{ isFocused, targetRef }}>
      {children}
    </DisplayListContext.Provider>
  );
}
