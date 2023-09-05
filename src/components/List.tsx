import { useDisplay } from '../context/DisplayListContext';

function List() {
  const isFocused = useDisplay()?.isFocused;

  return (
    isFocused && (
      <ul>
        <li>결과</li>
        <li>결과</li>
      </ul>
    )
  );
}

export default List;
