import { createContext, useContext, Provider } from 'react';

/** Creates a React context and and an associated context hook hook */
export default function makeContext<T>(defaultValue: T | null = null): [Provider<T | null>, () => T | null] {
  const Context = createContext(defaultValue);
  const useCreatedContext = () => useContext(Context);

  return [Context.Provider, useCreatedContext];
}
