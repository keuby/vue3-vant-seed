import { SafeAny } from '@/utils';
import { AxiosResponse } from 'axios';

export interface AxiosInterceptor {
  onFulfilled?(response: AxiosResponse<SafeAny>): SafeAny;
  onRejected?(error: SafeAny): SafeAny;
}

export class DefaultInterceptor implements AxiosInterceptor {
  onFulfilled?(response: AxiosResponse<SafeAny>): SafeAny {
    return response.data;
  }

  onRejected(error: SafeAny): SafeAny {
    if (!error.response) {
      return Promise.reject(error);
    }
    const response = error.response;
    const code = response.status;
    const data = response.data;

    if (!response.config.skipHandle) {
      if (code === 400) {
        // TODO: 参数错误
      } else if (code === 401) {
        // TODO: 用户未授权
      } else if (code === 403) {
        // TODO: 用户权限不足
      } else if (code === 404) {
        // TODO: 请求没有找到资源
      } else if (code === 500) {
        // TODO: 服务器内部错误
      }
    }
    return Promise.reject(data);
  }
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipHandle?: boolean;
  }
}
