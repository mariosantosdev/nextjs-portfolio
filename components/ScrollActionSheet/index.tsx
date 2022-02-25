import { MutableRefObject, UIEvent, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

interface IScrollActionSheet {
  target: MutableRefObject<HTMLDivElement>;
  onClick: (target: MutableRefObject<HTMLDivElement>) => void;
}

export function onScroll(target: MutableRefObject<HTMLDivElement>) {
  const button = document.getElementById('btn_scroll_action_sheet');
  if (!button) return;

  const windowHeight = window.innerHeight;
  if (target.current.scrollTop >= windowHeight) {
    button.style.display = 'flex';
  } else {
    button.style.display = 'none';
  }
}

export default function ScrollActionSheet({
  target,
  onClick,
}: IScrollActionSheet) {
  return (
    <button
      id="btn_scroll_action_sheet"
      onClick={() => onClick(target)}
      className="absolute z-50 hidden p-4 bg-indigo-500 rounded-full shadow-2xl cursor-pointer shadow-black bottom-8 right-8"
    >
      <FiArrowUp className="text-white" />
    </button>
  );
}
