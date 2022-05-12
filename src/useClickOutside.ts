import { RefObject, useEffect } from 'react';

// https://www.30secondsofcode.org/react/s/use-click-outside
export default function useClickOutside(ref: RefObject<HTMLElement>, callback: () => void) {
  const onClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  });
}
