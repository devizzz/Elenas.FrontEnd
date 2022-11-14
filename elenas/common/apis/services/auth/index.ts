import { LoginType } from '@common/apis/types/login/LoginType';
import { UserInfo } from '@common/apis/types/user/UserInfo';
import http from '@common/http';

const login = async (data: LoginType): Promise<UserInfo> =>
  (await http.post(`${process.env.ELENAS_API}/users/login/`, data)).data;

export default login;
