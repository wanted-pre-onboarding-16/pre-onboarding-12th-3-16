import { useDisplay } from '../context/DisplayListContext';

function Input() {
  const targetRef = useDisplay()?.targetRef;

  return (
    <div>
      <input className="border border-blue-600" ref={targetRef} type="text" />
      <button>SEARCH</button>
    </div>
  );
}

export default Input;
