import { RefObject, useEffect } from 'react';

// https://www.30secondsofcode.org/react/s/use-click-outside

/** Run `callback` when a click occurs outside of the element referenced by `ref`
 * @param ref The reference to the element to watch for clicks outside of
 * @param callback The function to run when a click occurs outside of the element
 * @example
 * function MyComponent() {
 *    const ref = useRef(null);
 *    useClickOutside(ref, () => console.log('Clicked outside!'));
 *    return <div ref={ref}>My Component</div>;
 * }
 */
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
