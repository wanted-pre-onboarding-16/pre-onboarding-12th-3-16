import { useEffect, useState, useCallback } from 'react';
import { useDiseasStore } from '../context/DiseaseStoreContext';
import { useDisplay } from '../context/DisplayListContext';
import ListItem from './ListItem';

function List() {
  const display = useDisplay();
  const data = useDiseasStore();
  const [isOnIndex, setIsOnIndex] = useState(0);

  const handleMoveList = useCallback(
    (e: KeyboardEvent) => {
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
      setIsOnIndex(-2);
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
