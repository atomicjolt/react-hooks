import { RefObject, useCallback, useEffect } from 'react';

type Callback = (event: KeyboardEvent) => void;

export default function useKeyDown<T extends HTMLElement>(
  ref: RefObject<T>,
  callback: (event: KeyboardEvent) => void,
): void;
export default function useKeyDown<T extends HTMLElement>(
  ref: RefObject<T>,
  key: string,
  callback: (event: KeyboardEvent) => void,
): void;

export default function useKeyDown<T extends HTMLElement>(
  ref: RefObject<T>,
  keyOrCallback: string | Callback,
  callback?: Callback,
): void {
  let key: string | null = null;

  if (typeof keyOrCallback === 'string') {
    key = keyOrCallback;
    callback = callback as Callback;
  } else {
    callback = keyOrCallback as Callback;
  }

  const wrapper = useCallback(
    (e: KeyboardEvent) => {
      if (key && e.key === key) {
        callback!(e);
      } else {
        callback!(e);
      }
    },
    [key, callback],
  );

  useEffect(() => {
    const element = ref.current;
    element?.addEventListener('keydown', wrapper);
    return () => element?.removeEventListener('keydown', wrapper);
  }, [ref, wrapper]);
}
