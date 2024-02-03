import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(await resolveValue(5)).toBe(5);
    expect(await resolveValue('next')).toBe('next');
    expect(await resolveValue(null)).toBe(null);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('hi')).toThrow('hi');
    expect(() => throwError('something else')).toThrow('something else');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect.assertions(2);
    try {
      await rejectCustomError();
    } catch (err) {
      expect(err).toBeInstanceOf(MyAwesomeError);
      expect(err).toHaveProperty('message', 'This is my awesome custom error!');
    }

    //expect(await rejectCustomError()).toBe('This is my awesome custom error!');
  });
});
