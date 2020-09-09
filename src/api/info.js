import { createApi } from './createApi'

export default function () {
  return createApi('/info', 'get')
}
