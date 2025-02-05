import { sum } from '../utils/functions';

describe('sum function', () => {
  it('should return the sum of two numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });

  it('should return a negative number when summing two negative numbers', () => {
    expect(sum(-1, -2)).toBe(-3);
  });

  it('should return zero when summing zero and zero', () => {
    expect(sum(0, 0)).toBe(0);
  });
});
