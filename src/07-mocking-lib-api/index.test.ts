import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');
  return {
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  afterAll(() => {
    jest.unmock('lodash');
  });
  const relativePath = 'types';
  const baseURL = 'https://jsonplaceholder.typicode.com';
  test('should create instance with provided base url', async () => {
    const axiosSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(relativePath);
    expect(axiosSpy).toBeCalledWith({ baseURL });
    axiosSpy.mockRestore();
  });

  test('should perform request to correct provided url', async () => {
    const getSpy = jest.spyOn(axios.create(), 'get');
    await throttledGetDataFromApi(relativePath);
    expect(getSpy).toBeCalledWith(relativePath);
    getSpy.mockRestore();
  });

  test('should return response data', async () => {
    const getSpy = jest.spyOn(axios.create(), 'get');
    getSpy.mockResolvedValue({ data: 'mockedData' });
    expect(await throttledGetDataFromApi(relativePath)).toBe('mockedData');
    getSpy.mockRestore();
  });
});
