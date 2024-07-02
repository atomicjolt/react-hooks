import { useState, useMemo } from 'react';
import { StateInput } from '../types';

type DefaultReturn<T> = [state: T, setState: (newState: T) => void, revert: () => void];

/** `setState` wrapper to "reset" your state back to a default values
 * @param initialState - The initial state to store
 * @returns an array of:
 *  - the state value
 *  - a function to update the state
 *  - a function to revert the state back to it's initial value
 */
export function useDefaultState<T>(initialState: StateInput<T>): DefaultReturn<T> {
  // We cache the initial value of initialState so that this behaves the same
  // as other hooks typically do when you pass a new value
  const defaultState = useMemo(() => typeof initialState === "function" ? (initialState as Function)() : initialState, []);
  const [state, setState] = useState<T>(initialState);

  return [state, setState, () => setState(defaultState)];
}
