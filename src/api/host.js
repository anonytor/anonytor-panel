import { createApi } from './createApi'

export default {
  getList: () => createApi('/host', 'get'),
  getDetail: (id) => createApi(`/host/${id}`, 'get'),
  create: ({ name, os }) => createApi(`/host`, 'post', { name, os }),
  delete: (id) => createApi(`/host/${id}`, 'delete')
}
