import { useHttpClient } from '@/plugins/http'

const http = useHttpClient()

export function getUserProfile() {
  return http.get('/typicode/demo/db')
}
