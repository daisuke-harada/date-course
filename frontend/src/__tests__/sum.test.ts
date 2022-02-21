/**
 * @jest-environment node
 */

import { sum } from '__testSupports/sum';

describe('足し算', () => {
  it('1+3は4です', () => {
    expect(sum( 1, 3)).toBe(4);
  });
});