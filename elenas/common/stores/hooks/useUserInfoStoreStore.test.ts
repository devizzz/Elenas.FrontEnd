import userInfoStore from '../userInfoStore';
import { renderHook } from '@testing-library/react-hooks';

import useUserInfoStoreStore from './useUserInfoStoreStore';

describe('UserInfo store Hook', () => {
  it('creates a userInfo store hook', () => {
    const { result } = renderHook(() => useUserInfoStoreStore());
    expect(result.current).toBe(userInfoStore.getState());
  });
});
