import { createContext, useCallback, useContext, useState } from 'react';

type DiseaseDataType = {
  sickCd: string;
  sickNm: string;
};
type TState = DiseaseDataType[] | [];

type TUpdateDiseaStoreFn = (value: Array<DiseaseDataType>) => void;
interface IUpdateDiseaStore {
  updateDiseaStore: TUpdateDiseaStoreFn;
}

const DiseasStoreContext = createContext<TState | null>(null);
const ChangeDiseasStoreContext = createContext<IUpdateDiseaStore | null>(null);

export const useDiseasStore = () => useContext(DiseasStoreContext);

export const useChangeDiseasStore = () => useContext(ChangeDiseasStoreContext);

export function DiseasStoreProvider({ children }: { children: React.ReactNode }) {
  const [diseaStore, setDiseasStore] = useState<TState>([]);

  const updateDiseaStore: TUpdateDiseaStoreFn = useCallback(value => {
    setDiseasStore(() => [...value]);
  }, []);

  return (
    <DiseasStoreContext.Provider value={diseaStore}>
      <ChangeDiseasStoreContext.Provider value={{ updateDiseaStore }}>
        {children}
      </ChangeDiseasStoreContext.Provider>
    </DiseasStoreContext.Provider>
  );
}
