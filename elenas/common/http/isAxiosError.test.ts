import isAxiosError from './isAxiosError';

describe('is axios error', () => {
  it('returns true when is an axios error', () => {
    expect(isAxiosError({ isAxiosError: true })).toBe(true);
  });

  it('returns false when is not an axios error', () => {
    expect(isAxiosError({})).toBe(false);
  });
});
