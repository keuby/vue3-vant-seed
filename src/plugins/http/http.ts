import { SafeAny } from '@/utils';
import { AxiosInstance, AxiosRequestConfig } from 'axios';

export default class HttpClient {
  constructor(private http: AxiosInstance) {}

  request<T = SafeAny>(config: AxiosRequestConfig): Promise<T> {
    return this.http.request(config);
  }

  get<T = SafeAny>(url: string, params?: SafeAny, config?: AxiosRequestConfig): Promise<T> {
    return this.http.request({ method: 'GET', url, params, ...config });
  }

  delete<T = SafeAny>(url: string, params?: SafeAny, config?: AxiosRequestConfig): Promise<T> {
    return this.http.request({ method: 'DELETE', url, params, ...config });
  }

  head<T = SafeAny>(url: string, params?: SafeAny, config?: AxiosRequestConfig): Promise<T> {
    return this.http.request({ method: 'HEAD', url, params, ...config });
  }

  options<T = SafeAny>(url: string, params?: SafeAny, config?: AxiosRequestConfig): Promise<T> {
    return this.http.request({ method: 'OPTIONS', url, params, ...config });
  }

  post<T = SafeAny>(url: string, data?: SafeAny, config?: AxiosRequestConfig): Promise<T> {
    return this.http.request({ method: 'POST', url, data, ...config });
  }

  put<T = SafeAny>(url: string, data?: SafeAny, config?: AxiosRequestConfig): Promise<T> {
    return this.http.request({ method: 'PUT', url, data, ...config });
  }

  patch<T = SafeAny>(url: string, data?: SafeAny, config?: AxiosRequestConfig): Promise<T> {
    return this.http.request({ method: 'PATCH', url, data, ...config });
  }
}
