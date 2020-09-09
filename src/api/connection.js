import { createApi } from './createApi'

export default {
  getList: (id) => createApi(`/connection`, 'get', {}, { id })
}
