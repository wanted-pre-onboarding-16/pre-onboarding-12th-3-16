// useListNavigation.ts
import { useEffect, useState, useCallback, useRef } from 'react';

const DEBOUNCE_TIME_MS = 200;
const INITIAL_INDEX = -1;

let lastKeyPressedTime = 0;

function useListNavigation(dataLength: number, isFocused: boolean) {
  const [isOnIndex, setIsOnIndex] = useState(INITIAL_INDEX);
  const ulRef = useRef<HTMLUListElement>(null);

  const handleMoveList = useCallback(
    (e: KeyboardEvent) => {
      const now = Date.now();

      if (now - lastKeyPressedTime < DEBOUNCE_TIME_MS) {
        return;
      }

      lastKeyPressedTime = now;

      if (!['ArrowUp', 'ArrowDown'].includes(e.code)) return;

      e.stopPropagation();
      e.preventDefault();

      setIsOnIndex(prev => {
        if (e.code === 'ArrowUp') {
          return Math.max(prev - 1, 0);
        }

        if (e.code === 'ArrowDown' && dataLength) {
          return Math.min(prev + 1, dataLength - 1);
        }

        return prev;
      });
    },
    [dataLength],
  );

  useEffect(() => {
    if (isFocused) {
      window.addEventListener('keydown', handleMoveList, true);
      return () => {
        window.removeEventListener('keydown', handleMoveList, true);
      };
    }
  }, [isFocused, handleMoveList]);

  useEffect(() => {
    const ulElement = ulRef.current;
    if (ulElement && isOnIndex >= 0 && isOnIndex < ulElement.children.length) {
      const currentItem = ulElement.children[isOnIndex];
      currentItem?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isOnIndex]);

  useEffect(() => {
    if (!isFocused) {
      setIsOnIndex(INITIAL_INDEX);
    }
  }, [isFocused]);

  return { isOnIndex, ulRef };
}

export default useListNavigation;
