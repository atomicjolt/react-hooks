import { useState } from 'react';

type DefaultReturn<T> = [state: T, setState: (newState: T) => void, revert: () => void];

interface DefaultState<T> {
  default: T;
  current: T;
}

export function useDefaultState<T>(data: T): DefaultReturn<T> {
  const [state, setState] = useState<DefaultState<T>>({
    default: data,
    current: data,
  });

  const updateCurrent = (newState: T) => setState({ ...state, current: newState });

  const reset = () => setState({ ...state, current: state.default });

  return [state.current, updateCurrent, reset];
}
