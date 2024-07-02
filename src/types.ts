export type StateInput<S> = S | (() => S);
export type StateUpdate<S> = S | ((prevState: S) => S);
