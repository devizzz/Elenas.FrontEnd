import { SignupType } from '@common/apis/types/signup/SignupType';
import { UserInfo } from '@common/apis/types/user/UserInfo';
import http from '@common/http';

const signup = async (data: SignupType): Promise<UserInfo> =>
  (await http.post(`${process.env.ELENAS_API}/users/signup/`, data)).data;

export default signup;
