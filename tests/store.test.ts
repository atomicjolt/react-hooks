import { expect, expectTypeOf, test, describe, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { createStoreHook } from '../src/store';

describe('createStoreHook', () => {
  const useCount = createStoreHook(0);

  test('should return a hook', () => {
    expectTypeOf(useCount).toBeFunction();
  });

  test('should return the initial state', () => {
    const { result } = renderHook(() => useCount());

    expect(result.current[0]).toBe(0);
  });

  test('should update the state', () => {
    const { result } = renderHook(() => useCount());

    act(() => result.current[1](1));

    expect(result.current[0]).toBe(1);
  });

  test('should update the state with a function', () => {
    const { result } = renderHook(() => useCount());

    act(() => result.current[1](0));
    act(() => result.current[1]((count) => count + 1));

    expect(result.current[0]).toBe(1);
  });
});
