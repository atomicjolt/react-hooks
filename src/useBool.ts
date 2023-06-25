import { useCallback, useState } from 'react';

type UseBooleanReturn = [value: boolean, toggle: () => void, setTrue: () => void, setFalse: () => void];

/** Simple `useState` wrapper for boolean values
 * @param intialState - The boolean value to start with. Defaults as false
 * @example
 * const [bool, toggle, setTrue, setFalse] = useBool();
 * // bool === false
 * // toggle() => bool === true
 * // setTrue() => bool === true
 * // setFalse() => bool === false
 * @returns {UseBooleanReturn} an array of:
 *  - the current value
 *  - a function to toggle the boolean value
 *  - a function to set the boolean value to `true`
 *  - a function to set the boolean value to `false`
 */
export function useBool(intialState: boolean = false): UseBooleanReturn {
  const [bool, setBool] = useState(intialState);

  const toggle = useCallback(() => setBool((val) => !val), []);

  return [bool, toggle, () => setBool(true), () => setBool(false)];
}
