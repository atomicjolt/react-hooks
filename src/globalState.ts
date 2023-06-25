import { useEffect, useState } from 'react';

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

  updateState = (state: S) => {
    this._state = state;
    this.notifySubscribers();
  };

  private notifySubscribers = () => {
    this.subscriptions.forEach((sub) => sub(this.state));
  };
}

export function makeGlobalStateHook<S>(initialState: S) {
  const store = new Store<S>(initialState);

  return function useGlobalState(): [state: S, setter: (state: S) => void] {
    const [state, setState] = useState(store.state);

    useEffect(() => store.subscribe((state) => setState(state)));

    return [state, store.updateState];
  };
}
