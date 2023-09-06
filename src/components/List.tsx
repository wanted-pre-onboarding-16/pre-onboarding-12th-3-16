import { useDiseasStore } from '../context/DiseaseStoreContext';
import { useDisplay } from '../context/DisplayListContext';

function List() {
  const isFocused = useDisplay()?.isFocused;
  const data = useDiseasStore();

  return isFocused && <ul>{data?.map(el => <li key={el.sickCd}>{el.sickNm}</li>)}</ul>;
}

export default List;
