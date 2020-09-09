<template>
  <a-form-model layout="vertical">
    <a-form-model-item label="过期时间">
      <a-date-picker v-model="expiredAt" :disabled="isCreating" style="width: 100%"/>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import moment from 'moment'
import api from '../api'
export default {
  name: 'CreateToken',
  props: {
    isCreating: Boolean
  },
  data () {
    return {
      expiredAt: moment().hour(23).minute(59).second(59)
    }
  },
  methods: {
    create () {
      this.expiredAt = this.expiredAt.hour(23).minute(59).second(59)
      this.$emit('update:isCreating', true)
      api.token.create({ expiredAt: this.expiredAt })
        .then(res => {
          this.$emit('created')
          this.$emit('update:isCreating', false)
          this.$success({
            title: `成功创建 Token ${res.data.token.token}`
          })
        })
        .catch(() => {
          this.$message.error('创建 Token 失败')
          this.$emit('update:isCreating', false)
        })
    }
  }
}
</script>

<style scoped>

</style>
