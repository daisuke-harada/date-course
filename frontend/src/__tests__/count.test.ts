import { act, renderRecoilHook} from 'react-recoil-hooks-testing-library';
import { countState, useRecoilCounter } from '__testSupports/count';

describe('useRecoilCounter', () => {
  it('returns default count value', () => {
    const { result } = renderRecoilHook(useRecoilCounter);
    expect(result.current.count).toBe(0);
  });

  it('updates the counter when increment is called', () => {
    const { result } = renderRecoilHook(useRecoilCounter);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it('returns updated default atom state', () => {
    const { result } = renderRecoilHook(useRecoilCounter, {
      states: [{ recoilState: countState, initialValue: 42 }],
    });

    expect(result.current.count).toBe(42);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(43);
  });
});