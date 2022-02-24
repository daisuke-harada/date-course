import { atom, useRecoilState } from "recoil";

export const countState = atom({
  key: 'count',
  default: 0,
});

export const useRecoilCounter = (initialProps: string) => {
  const [count, setCount] = useRecoilState(countState);

  const increment = () => {
    setCount(count => count + 1);
  }

  return { increment, count};
}