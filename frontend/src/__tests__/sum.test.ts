import { sumSapport } from '__tests__/sumSapport.test';

const sum = (a:number, b:number) => {
  return sumSapport(a , b);
};

test("Dummy unit test", () => {
const actual = sum(1, 2);
  expect(actual).toBe(3);
});