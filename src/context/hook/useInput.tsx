import { useChangeDiseasStore } from '../DiseaseStoreContext';
import { httpClient } from '../../util/HttpClinet';
import { query } from '../../util/QueryCore';

function useInput() {
  const updateDisease = useChangeDiseasStore()?.updateDiseaStore;
  if (!updateDisease) return;

  let Timer: NodeJS.Timeout | undefined;
  const onChangeValue = (inputText: string) => {
    if (Timer) clearTimeout(Timer);
    Timer = setTimeout(async () => {
      if (inputText.trim()) {
        const isCaching = await query.cacheHit(inputText);
        const staleTime = await query.cacheStale(inputText);
        if (isCaching) {
          if (staleTime <= Date.now()) {
            const result = await query.reRequest(inputText);
            updateDisease(result);
          } else {
            updateDisease(isCaching);
          }
        } else {
          const response = await httpClient.get(inputText);
          if (response.data.length === 0) return updateDisease([]);
          await query.addCache(inputText, response);
          await query.addStale(inputText, response);
          await query.addCacheTime(inputText, response);
          updateDisease(response.data);
        }
      } else {
        updateDisease([]);
      }
    }, 500);
    return () => clearTimeout(Timer);
  };

  return { onChangeValue };
}

export default useInput;
