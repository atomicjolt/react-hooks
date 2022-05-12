import { useState, useRef } from 'react';

type DefaultReturn<T> = [state: T, setState: (newState: T) => void, revert: () => void];

/** `setState` wrapper to "reset" your state back to default values
 * @param initialState - The initial state to store
 * @returns an array of:
 *  - the state value
 *  - a function to update the state
 *  - a function to revert the state back to it's initial value
 */
export function useDefaultState<T>(initialState: T): DefaultReturn<T> {
  const defaultState = useRef(initialState).current;
  const [state, setState] = useState<T>(initialState);

  return [state, setState, () => setState(defaultState)];
}
