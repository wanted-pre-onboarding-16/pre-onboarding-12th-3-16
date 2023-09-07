import { useEffect, useState } from 'react';
import { useDiseasStore } from '../context/DiseaseStoreContext';
import { useDisplay } from '../context/DisplayListContext';
import ListItem from './ListItem';

function List() {
  const display = useDisplay();
  const data = useDiseasStore();
  const [isOnIndex, setIsOnIndex] = useState(0);
  useEffect(() => {
    const moveList = (e: KeyboardEvent) => {
      e.stopPropagation();
      if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
        e.preventDefault();
      }

      switch (e.code) {
        case 'ArrowUp':
          setIsOnIndex(pre => {
            if (pre <= 0) return (pre = 0);
            else pre -= 1;
            return pre;
          });
          break;
        case 'ArrowDown':
          setIsOnIndex(pre => {
            if (!data?.length) return pre;
            if (pre === data?.length - 1) return pre;
            else pre += 1;
            return pre;
          });
          break;
        default:
          return;
      }
    };

    if (display?.isFocused) {
      window.addEventListener('keydown', moveList, true);
    } else {
      window.removeEventListener('keydown', moveList, true);
    }
    return () => {
      window.removeEventListener('keydown', moveList, true);
    };
  }, [data?.length, display?.isFocused]);

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
