import { createApi } from './createApi'

export default {
  getClipboard: (id) => createApi('/task', 'post', {id, cmdType: 'GetClipboardText', params: {}})
}
