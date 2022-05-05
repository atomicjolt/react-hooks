import { useBool } from '../src';
import { renderHook, act } from '@testing-library/react-hooks';

describe('useBool', () => {
  test('uses false as a default', () => {
    const { result } = renderHook(() => useBool());

    expect(result.current[0]).toBe(false);
  });

  test('accepts an alternative default', () => {
    const { result } = renderHook(() => useBool(true));
    expect(result.current[0]).toBe(true);
  });

  test('toggling boolean', () => {
    const { result } = renderHook(() => useBool());

    const toggle = result.current[1];

    act(() => toggle());
    expect(result.current[0]).toBe(true);

    act(() => toggle());
    expect(result.current[0]).toBe(false);
  });

  test('setting to true', () => {
    const { result } = renderHook(() => useBool());

    const setTrue = result.current[2];
    act(() => setTrue());

    expect(result.current[0]).toBe(true);
  });

  test('setting to false', () => {
    const { result } = renderHook(() => useBool(true));

    const selfFalse = result.current[3];
    act(() => selfFalse());

    expect(result.current[0]).toBe(false);
  });
});
