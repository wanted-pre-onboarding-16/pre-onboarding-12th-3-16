import Input from './components/Input';
import List from './components/List';
import { DisplayProvider } from './context/DisplayListContext';

function App() {
  return (
    <div className="max-w-[1024px] mx-auto mt-10 bg-slate-400 flex justify-center items-center flex-col ">
      <DisplayProvider>
        <Input />
        <List />
      </DisplayProvider>
    </div>
  );
}

export default App;
