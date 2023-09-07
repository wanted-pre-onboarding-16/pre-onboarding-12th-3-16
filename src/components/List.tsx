import { useEffect, useState, useCallback } from 'react';
import { useDiseasStore } from '../context/DiseaseStoreContext';
import { useDisplay } from '../context/DisplayListContext';
import ListItem from './ListItem';

const DEBOUNCE_TIME_MS = 200;
const INITIAL_INDEX = -1;

let lastKeyPressedTime = 0;

function List() {
  const display = useDisplay();
  const data = useDiseasStore();
  const [isOnIndex, setIsOnIndex] = useState(0);

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

        if (e.code === 'ArrowDown' && data?.length) {
          return Math.min(prev + 1, data.length - 1);
        }

        return prev;
      });
    },
    [data?.length],
  );

  useEffect(() => {
    if (display?.isFocused) {
      window.addEventListener('keydown', handleMoveList, true);
      return () => {
        window.removeEventListener('keydown', handleMoveList, true);
      };
    }
  }, [display?.isFocused, handleMoveList]);

  useEffect(() => {
    const currentItem = document.getElementById(`item-${isOnIndex}`);
    currentItem?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [isOnIndex]);

  useEffect(() => {
    if (!display?.isFocused) {
      setIsOnIndex(INITIAL_INDEX);
    }
  }, [display?.isFocused]);

  return (
    display?.isFocused && (
      <ul>
        {data?.length === 0 ? (
          <li>검색어가 없습니다.</li>
        ) : (
          data?.map((el, idx) => (
            <ListItem key={el.sickCd} data={el.sickNm} isOn={idx === isOnIndex} idx={idx} />
          ))
        )}
      </ul>
    )
  );
}

export default List;
