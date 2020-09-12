import { createApi } from './createApi'

export default {
  create: ({ os, id, cmd, params }) => createApi('/task', 'post', { os, id, cmd, params }),
  getStatus: (hostId, taskId) => createApi('/task', 'get', {}, { hostId, taskId })
}
