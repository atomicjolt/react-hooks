import { useCallback, useState } from 'react';

type UseBooleanReturn = [value: boolean, toggle: () => void, setTrue: () => void, setFalse: () => void];

/** Simple `useState` wrapper for boolean values
 * @param intialState - The boolean value to start with. Defaults as false
 * @returns {UseBooleanReturn} an array of:
 *  - the current value
 *  - a function to toggle the boolean value
 *  - a function to set the boolean value to `true`
 *  - a function to set the boolean value to `false`
 */
export default function useBool(intialState: boolean = false): UseBooleanReturn {
  const [bool, setBool] = useState(intialState);

  const toggle = useCallback(() => setBool((val) => !val), []);

  return [bool, toggle, () => setBool(true), () => setBool(false)];
}
