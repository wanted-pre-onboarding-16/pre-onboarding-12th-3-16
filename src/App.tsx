import Input from './components/Input';
import List from './components/List';
import { DiseasStoreProvider } from './context/DiseaseStoreContext';
import { DisplayProvider } from './context/DisplayListContext';

function App() {
  return (
    <div className="h-screen w-screen relative flex flex-col items-center bg-gray-200">
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
