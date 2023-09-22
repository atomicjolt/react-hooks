export type ValueUpdate<S> = S | ((state: S) => S);

export function resolveValue<T>(prev: T, next: ValueUpdate<T>): T {
  // @ts-ignore
  return typeof next === 'function' ? next(prev) : next;
}
