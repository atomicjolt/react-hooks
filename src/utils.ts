import { StateUpdate } from './types';

export function resolveValue<T>(prev: T, next: StateUpdate<T>): T {
  return typeof next === 'function' ? (next as Function)(prev) : next;
}
