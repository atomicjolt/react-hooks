import { createContext, useContext, Provider } from 'react';

/** Creates a React context and and an associated context hook */
export default function makeContext<T>(defaultValue: T): [Provider<T>, () => T] {
  const Context = createContext(defaultValue);
  const useCreatedContext = () => useContext(Context);

  return [Context.Provider, useCreatedContext];
}
