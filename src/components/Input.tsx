import { useDisplay } from '../context/DisplayListContext';
import useInput from '../hook/useInput';

function Input() {
  const targetRef = useDisplay()?.targetRef;

  const onChangeValue = useInput()?.onChangeValue;

  const ApiTrigger = () => {
    if (targetRef?.current && onChangeValue) onChangeValue(targetRef?.current.value);
  };

  return (
    <div>
      <input className="border border-blue-600" ref={targetRef} type="text" onChange={ApiTrigger} />
      <button>SEARCH</button>
    </div>
  );
}

export default Input;
