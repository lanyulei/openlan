import type { UserInfo } from '@vben/types';

import { requestClient } from '#/api/request';
import { V1 } from '#/api/version';

/**
 * 刷新token
 */

/**
 * 获取用户信息
 */
export async function getUserInfo() {
  return requestClient.get<UserInfo>(`${V1}/system/user/details`);
}
