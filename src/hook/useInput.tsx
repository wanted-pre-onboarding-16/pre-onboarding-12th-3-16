import { useChangeDiseasStore } from '../context/DiseaseStoreContext';
import { httpClient } from '../util/HttpClinet';

function useInput() {
  const updateDisease = useChangeDiseasStore()?.updateDiseaStore;
  if (!updateDisease) return;

  let Timer: NodeJS.Timeout | undefined;
  const onChangeValue = (inputText: string) => {
    if (Timer) clearTimeout(Timer);
    Timer = setTimeout(async () => {
      if (inputText.trim()) {
        const cachesHit = await caches
          .open('Disease Cache')
          .then(cache => cache.match('/sick?q=' + inputText));
        if (!cachesHit) {
          const response = await httpClient.get(inputText);

          const convertAxiosResponseToFatch = new Response(JSON.stringify(response.data), {
            status: response.status,
            statusText: response.statusText,
          });
          await caches
            .open('Disease Cache')
            .then(cache => cache.put('/sick?q=' + inputText, convertAxiosResponseToFatch));
          updateDisease(response.data);
        } else {
          await caches.open('Disease Cache').then(
            async cache =>
              await cache.match('/sick?q=' + inputText).then(result => {
                if (result) {
                  result.json().then(result => updateDisease(result));
                }
              }),
          );
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
