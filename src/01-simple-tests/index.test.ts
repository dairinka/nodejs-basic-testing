// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 3, action: Action.Add })).toBe(4);
    expect(simpleCalculator({ a: 2, b: -2, action: Action.Add })).toBeNull;
    expect(simpleCalculator({ a: 1, b: 7, action: Action.Add })).toBe(8);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Subtract })).toBe(2);
    expect(simpleCalculator({ a: 17, b: 7, action: Action.Subtract })).toBe(10);
    expect(simpleCalculator({ a: 25, b: 4, action: Action.Subtract })).toBe(21);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 25, b: 30, action: Action.Multiply })).toBe(
      750,
    );
    expect(simpleCalculator({ a: 99, b: 1, action: Action.Multiply })).toBe(99);
    expect(simpleCalculator({ a: 3, b: 7, action: Action.Multiply })).toBe(21);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 35, b: 7, action: Action.Divide })).toBe(5);
    expect(simpleCalculator({ a: 49, b: 7, action: Action.Divide })).toBe(7);
    expect(simpleCalculator({ a: 30, b: 2, action: Action.Divide })).toBe(15);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 3, action: Action.Exponentiate })).toBe(
      1000,
    );
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Exponentiate })).toBe(
      4,
    );
    expect(simpleCalculator({ a: 3, b: 5, action: Action.Exponentiate })).toBe(
      243,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 4, action: 'plus' })).toBe(null);
    expect(simpleCalculator({ a: 2, b: 4, action: 3 })).toBe(null);
    expect(simpleCalculator({ a: 2, b: 4, action: null })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: 'two', b: 9, action: Action.Exponentiate }),
    ).toBe(null);
    expect(simpleCalculator({ a: 8, b: null, action: Action.Add })).toBe(null);
    expect(
      simpleCalculator({ a: ',', b: 9, action: Action.Exponentiate }),
    ).toBe(null);
  });
});
