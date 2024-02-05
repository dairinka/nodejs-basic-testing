import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const list = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: null,
          next: null,
        },
      },
    };
    const generateList = generateLinkedList([1, 2]);
    expect(generateList).toStrictEqual(list);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const generateList = generateLinkedList([2, 3, 4]);
    expect(generateList).toMatchSnapshot();
  });
});
