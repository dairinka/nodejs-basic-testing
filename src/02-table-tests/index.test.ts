import { simpleCalculator, Action } from './index';

type RawInput = {
  a: unknown;
  b: unknown;
  action: unknown;
  expected: unknown;
};

const testCases: RawInput[] = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 17, b: 7, action: Action.Subtract, expected: 10 },
  { a: 25, b: 4, action: Action.Subtract, expected: 21 },

  { a: 25, b: 30, action: Action.Multiply, expected: 750 },
  { a: 99, b: 1, action: Action.Multiply, expected: 99 },
  { a: 3, b: 7, action: Action.Multiply, expected: 21 },

  { a: 35, b: 7, action: Action.Divide, expected: 5 },
  { a: 49, b: 7, action: Action.Divide, expected: 7 },
  { a: 30, b: 2, action: Action.Divide, expected: 15 },

  { a: 10, b: 3, action: Action.Exponentiate, expected: 1000 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 5, action: Action.Exponentiate, expected: 243 },

  { a: 2, b: 4, action: 'plus', expected: null },
  { a: 2, b: 4, action: 3, expected: null },
  { a: 2, b: 4, action: null, expected: null },

  { a: 'two', b: 9, action: Action.Exponentiate, expected: null },
  { a: 8, b: null, action: Action.Add, expected: null },
  { a: ',', b: 9, action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  describe.each(testCases)(
    'simpleCalculator($a, $b, $action)',
    ({ a, b, action, expected }: RawInput) => {
      test(`should returns ${expected}`, () => {
        expect(simpleCalculator({ a, b, action })).toBe(expected);
      });
    },
  );
});
