import { memo } from 'react';

function ListItem({ data, isOn }: { data: string; isOn: boolean }) {
  return (
    <li className={`hover:bg-violet-400 cursor-pointer ${isOn && 'bg-violet-400'}`}>
      <h1>{data}</h1>
    </li>
  );
}

export default memo(ListItem);
