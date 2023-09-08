import { useDiseasStore } from '../context/DiseaseStoreContext';
import { useDisplay } from '../context/DisplayListContext';
import ListItem from './ListItem';
import useListNavigation from '../context/hook/useListNavigation';

function List() {
  const display = useDisplay();
  const data = useDiseasStore();

  const { isOnIndex, ulRef } = useListNavigation(data?.length || 0, display?.isFocused || false);

  return (
    display?.isFocused && (
      <ul
        ref={ulRef}
        className="w-[500px] h-[300px] mt-3 px-2 py-1 absolute top-32 rounded-lg overflow-auto shadow-lg bg-white"
      >
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
