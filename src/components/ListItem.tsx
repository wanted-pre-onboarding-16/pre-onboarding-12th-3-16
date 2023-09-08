import { memo } from 'react';

type ListItemProps = {
  key: string;
  data: string;
  isOn: boolean;
  idx: number;
};

function ListItem({ data, isOn, idx }: ListItemProps) {
  return (
    <li id={`item-${idx}`} className={`hover:bg-gray-100 cursor-pointer ${isOn && 'bg-gray-100'} mt-1 px-1 rounded`}>
      <h1>{data}</h1>
    </li>
  );
}

export default memo(ListItem);
