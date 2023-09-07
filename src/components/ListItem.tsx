import { memo } from 'react';

function ListItem({ data, isOn }: { data: string; isOn: boolean }) {
  return (
    <li className={`hover:bg-gray-100 cursor-pointer ${isOn && 'bg-gray-100'} mt-1 px-1 rounded`}>
      <h1>{data}</h1>
    </li>
  );
}

export default memo(ListItem);
