import Input from './components/Input';
import List from './components/List';
import { DiseasStoreProvider } from './context/DiseaseStoreContext';
import { DisplayProvider } from './context/DisplayListContext';

function App() {
  return (
    <div className="max-w-[1024px] mx-auto mt-10 bg-slate-400 flex justify-center items-center flex-col ">
      <DisplayProvider>
        <DiseasStoreProvider>
          <Input />
          <List />
        </DiseasStoreProvider>
      </DisplayProvider>
    </div>
  );
}

export default App;
