import { getUpdatedSearchParams } from './url';

describe('getUpdatedSearchParams', () => {
  it('supports multiple query params', async () => {
    const params = { a: ['1'], b: ['2'] };
    const searchParams = new URLSearchParams();

    const newParams = getUpdatedSearchParams({ params, searchParams });

    expect(newParams.toString()).toEqual('a=1&b=2');
  });

  it('supports non-defined query params', async () => {
    const params = { a: ['1'], b: [undefined] };
    const searchParams = new URLSearchParams();

    const newParams = getUpdatedSearchParams({ params, searchParams });

    expect(newParams.toString()).toEqual('a=1');
  });

  it('supports multiple params of the same key', async () => {
    const params = { a: ['1', '2', '3'], b: ['4'] };
    const searchParams = new URLSearchParams();

    const newParams = getUpdatedSearchParams({ params, searchParams });

    expect(newParams.toString()).toEqual('a=1&a=2&a=3&b=4');
  });
});
