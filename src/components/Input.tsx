import { useState } from 'react';
import { useDisplay } from '../context/DisplayListContext';
import useInput from '../hook/useInput';

function Input() {
  const [isFocused, setIsFocused] = useState(false);
  const targetRef = useDisplay()?.targetRef;

  const onChangeValue = useInput()?.onChangeValue;

  const ApiTrigger = () => {
    if (targetRef?.current && onChangeValue) onChangeValue(targetRef?.current.value);
  };

  // 포커스 이벤트 핸들러
  const handleFocus = () => {
    setIsFocused(true);
  };

  // 블러(blur) 이벤트 핸들러
  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="absolute top-20">
      <input
        className="w-[500px] px-3 py-3 rounded-md border border-teal-300 focus:outline-none focus:border-teal-500 shadow-md"
        placeholder={isFocused ? '' : '🔍 질환명을 입력해주세요.'}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={targetRef}
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
