import { useState } from 'react';

type UseValidatedStateReturn<T, E> = [state: T, error: E | null, setState: (newState: T) => void];

export default function useValidatedState<T, E = string>(
  intialState: T,
  validator: (newState: T) => void | E,
): UseValidatedStateReturn<T, E> {
  // Call validator here too?
  const [state, setState] = useState<T>(intialState);
  const [error, setError] = useState<E | null>(null);

  const setStateWrapper = (newState: T) => {
    const result = validator(newState);
    if (result) {
      setError(result);
    } else {
      setState(newState);
    }
  };

  return [state, error, setStateWrapper];
}
