import { createApi } from './createApi'

export default {
  getList: () => createApi('/token', 'get'),
  create: ({ expiredAt }) => createApi('/token', 'post', { expiredAt }),
  delete: ({ token }) => createApi('/token', 'delete', { token })
}
