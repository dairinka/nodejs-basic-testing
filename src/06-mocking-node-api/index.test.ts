import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';
import path from 'path';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  const cb = jest.fn();
  test('should set timeout with provided callback and timeout', () => {
    const timerSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(cb, 5);
    expect(timerSpy).toHaveBeenCalledTimes(1);
    expect(timerSpy).toHaveBeenLastCalledWith(expect.any(Function), 5);
    timerSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const timerSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(cb, 500);
    jest.advanceTimersByTime(500);
    expect(cb).toHaveBeenCalled();
    timerSpy.mockRestore();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  const cb = jest.fn();
  test('should set interval with provided callback and timeout', () => {
    const intervalSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(cb, 5);
    expect(intervalSpy).toHaveBeenCalled();
    expect(intervalSpy).toHaveBeenLastCalledWith(expect.any(Function), 5);
    intervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const intervalSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(cb, 3);
    jest.advanceTimersByTime(3);
    expect(cb).toHaveBeenCalled();
    intervalSpy.mockRestore();
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously('test.txt');
    expect(pathSpy).toHaveBeenCalledWith(expect.any(String), 'test.txt');
    pathSpy.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const existsSyncSpy = jest.spyOn(fs, 'existsSync');
    existsSyncSpy.mockReturnValue(false);
    expect(await readFileAsynchronously('test.txt')).toBeNull;
    existsSyncSpy.mockRestore();
  });

  test('should return file content if file exists', async () => {
    const text = "I'm not empty";
    const readFileSpy = jest.spyOn(fs.promises, 'readFile');
    const existsSyncSpy = jest.spyOn(fs, 'existsSync');
    existsSyncSpy.mockReturnValue(true);
    readFileSpy.mockResolvedValue(text);
    expect(await readFileAsynchronously('test.txt')).toBe("I'm not empty");
    readFileSpy.mockRestore();
    existsSyncSpy.mockRestore();
  });
});
