import { memo } from 'react';

type ListItemProps = {
  key: string;
  data: string;
  isOn: boolean;
  idx: number;
};

function ListItem({ data, isOn, idx }: ListItemProps) {
  return (
    <li
      id={`item-${idx}`}
      className={`hover:bg-violet-400 cursor-pointer ${isOn && 'bg-violet-400'}`}
    >
      <h1>{data}</h1>
    </li>
  );
}

export default memo(ListItem);
