import { baseRequestClient, requestClient } from '#/api/request';
import { V1 } from '#/api/version';

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password?: string;
    username?: string;
  }
}

/**
 * 登录
 */
export async function loginApi(data: AuthApi.LoginParams) {
  return requestClient.post(`${V1}/login`, data);
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  return baseRequestClient.post(`${V1}/refresh-token`, {
    withCredentials: true,
  });
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return requestClient.post(`${V1}/logout`, {
    withCredentials: true,
  });
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  return requestClient.get<string[]>('/auth/codes');
}
