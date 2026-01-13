import { request } from './request'
import type { User } from '@/types/user.ts'

export function login(data: { username: string; password: string }) {
  return request<User>({
    url: '/users/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data,
  })
}
