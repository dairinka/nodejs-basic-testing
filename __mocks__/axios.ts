const axios = {
  get: jest.fn(),
  create() {
    return {
      get: this.get.mockResolvedValue({ data: 'mockedData' }),
    };
  },
};
export default axios;
