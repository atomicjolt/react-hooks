import { useEffect, useRef } from 'react';

export default function useOnMount(callback: () => void) {
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    callback();
    mounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
