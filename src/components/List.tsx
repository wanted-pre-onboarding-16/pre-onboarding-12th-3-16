import { useEffect, useState } from 'react';
import { useDiseasStore } from '../context/DiseaseStoreContext';
import { useDisplay } from '../context/DisplayListContext';
import ListItem from './ListItem';

function List() {
  const display = useDisplay();
  const data = useDiseasStore();
  const [isOnIndex, setIsOnIndex] = useState(-2);
  useEffect(() => {
    const moveList = (e: KeyboardEvent) => {
      e.stopPropagation();

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
      window.addEventListener('keyup', moveList);
    } else {
      window.removeEventListener('keyup', moveList);
    }
    return () => {
      window.removeEventListener('keyup', moveList);
    };
  }, [data?.length, display?.isFocused]);

  return (
    display?.isFocused && (
      <ul className="w-[500px] h-[300px] mt-3 px-2 py-1 absolute top-32 rounded-lg overflow-auto shadow-lg bg-white">
        {data?.length === 0 ? (
          <li>검색어가 없습니다.</li>
        ) : (
          data?.map((el, idx) => (
            <ListItem key={el.sickCd} data={el.sickNm} isOn={idx === isOnIndex} />
          ))
        )}
      </ul>
    )
  );
}

export default List;
