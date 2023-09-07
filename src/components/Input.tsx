import { useRef } from 'react';
import { useDisplay } from '../context/DisplayListContext';
import useInput from '../context/hook/useInput';

function Input() {
  const inputRef = useRef<HTMLInputElement>(null);
  const onChangeValue = useInput()?.onChangeValue;
  const isWriting = useDisplay()?.isWriting;
  const ApiTrigger = () => {
    if (inputRef.current && onChangeValue) {
      onChangeValue(inputRef.current.value);
    }
  };
  const isFoucsInput = (e: React.FocusEvent<HTMLInputElement>) => {
    isWriting && isWriting(e.type);
  };

  return (
    <div>
      <input
        className="border border-blue-600"
        ref={inputRef}
        onChange={ApiTrigger}
        onFocus={isFoucsInput}
        onBlur={isFoucsInput}
        type="text"
      />
      <button>SEARCH</button>
    </div>
  );
}

export default Input;
