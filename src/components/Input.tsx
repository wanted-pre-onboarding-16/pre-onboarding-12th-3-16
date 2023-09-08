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
    <div className="absolute top-20">
      <input
        className="w-[500px] px-3 py-3 rounded-md border border-teal-300 focus:outline-none focus:border-teal-500 shadow-md"
        placeholder={isWriting ? '🔍 질환명을 입력해주세요.' : ''}
        onFocus={isFoucsInput}
        onBlur={isFoucsInput}
        ref={inputRef}
        type="text"
        onChange={ApiTrigger}
      />
      <button className="absolute top-2.5 right-4 bg-teal-500 hover:bg-white hover:text-teal-500  text-white rounded py-1 px-3 shadow-md">
        SEARCH
      </button>
    </div>
  );
}

export default Input;
