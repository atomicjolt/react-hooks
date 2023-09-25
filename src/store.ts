import { useEffect, useState } from 'react';
import { ValueUpdate, resolveValue } from './utils';

type SubscriptionFunc<S> = (state: S) => void;

class Store<S> {
  private _state: S;
  private subscriptions: SubscriptionFunc<S>[];

  constructor(state: S) {
    this._state = state;
    this.subscriptions = [];
  }

  get state() {
    return this._state;
  }

  subscribe = (func: SubscriptionFunc<S>) => {
    this.subscriptions.push(func);

    return () => {
      const index = this.subscriptions.indexOf(func);

      if (index !== -1) {
        this.subscriptions.splice(index, 1);
      }
    };
  };

  updateState = (state: ValueUpdate<S>) => {
    this._state = resolveValue(this._state, state);
    this.notifySubscribers();
  };

  private notifySubscribers = () => {
    this.subscriptions.forEach((sub) => sub(this.state));
  };
}

/**
 * Creates a store and a hook for subscribing to that store
 * @param initialState The initial state of the store
 * @returns A hook for subscribing to the store, that behaves like `useState`
 *
 * @example
 * // This hook can then be used in any component
 * // to get access to the store's state
 * const useCount = createStoreHook(0);
 *
 * function Counter() {
 *  const [count, setCount] = useCount();
 *
 *   return (
 *     <div>
 *       <p>Count: {count}</p>
 *       <button onClick={() => setCount(count += 1)}>Increment</button>
 *     </div>
 *   );
 * }
 */
export function createStoreHook<S>(initialState: S) {
  const store = new Store<S>(initialState);

  return function useGlobalState(): [state: S, setter: (s: ValueUpdate<S>) => void] {
    const [state, setState] = useState(store.state);

    useEffect(() => {
      const unsubscribe = store.subscribe((state) => setState(state));
      return unsubscribe;
    }, []);

    return [state, store.updateState];
  };
}
