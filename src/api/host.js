import { createApi } from './createApi'

export default {
  getList: () => createApi('/host', 'get'),
  getDetail: (id) => createApi(`/host/${id}`, 'get'),
  create: ({ name }) => createApi(`/host`, 'post', { name }),
  delete: (id) => createApi(`/host/${id}`, 'delete')
}
