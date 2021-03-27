import { SafeAny } from '@/utils';
import { useHttpClient } from '@/plugins/http';

const http = useHttpClient();

export function getUserProfile(): Promise<SafeAny> {
  return http.get('/typicode/demo/db');
}
