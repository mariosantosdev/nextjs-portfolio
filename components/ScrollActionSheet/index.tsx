import { MutableRefObject, UIEvent, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

interface IScrollActionSheet {
  target: MutableRefObject<HTMLDivElement>;
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

export default function ScrollActionSheet({ target }: IScrollActionSheet) {
  function scrollToTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    target.current.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  return (
    <button
      id="btn_scroll_action_sheet"
      onClick={scrollToTop}
      className="absolute z-50 hidden p-4 bg-indigo-500 rounded-full shadow-2xl cursor-pointer shadow-black bottom-8 right-8"
    >
      <FiArrowUp className="text-white" />
    </button>
  );
}
