import { useState } from 'react';
import { httpClient } from '../util/HttpClinet';

function useInput() {
  const [diseaseList, setDiseaseList] = useState();
  let Timer: NodeJS.Timeout | undefined;
  const onChangeValue = (inputText: string) => {
    if (Timer) clearTimeout(Timer);
    Timer = setTimeout(() => {
      if (inputText.trim()) {
        httpClient.get(inputText).then(response => setDiseaseList(response.data));
      }
    }, 500);
    return () => clearTimeout(Timer);
  };

  return { onChangeValue, diseaseList };
}

export default useInput;
