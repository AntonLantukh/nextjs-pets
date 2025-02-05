import { getUrlWithQueryParams } from './url';

describe('getUrlWithQueryParams', () => {
  it('supports multiple query params', async () => {
    const url = getUrlWithQueryParams({ url: 'https://test.com', params: { a: '1', b: '2' } });

    expect(url).toEqual('https://test.com/?a=1&b=2');
  });

  it('supports non-defined query params', async () => {
    const url = getUrlWithQueryParams({
      url: 'https://test.com',
      params: { a: '1', b: null, c: '3' },
    });

    expect(url).toEqual('https://test.com/?a=1&c=3');
  });
});
