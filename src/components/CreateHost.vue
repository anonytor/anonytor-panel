<template>
  <a-form-model layout="vertical">
    <a-form-model-item label="名称">
      <a-input v-model="name" :disabled="isCreating"></a-input>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import api from '../api'
export default {
  name: 'CreateHost',
  props: {
    isCreating: Boolean
  },
  data () {
    return {
      name: ''
    }
  },
  methods: {
    create () {
      this.$emit('update:isCreating', true)
      api.host.create({ name: this.name })
        .then(res => {
          this.$message.success(`成功创建主机 ${res.data.id}`)
          this.$emit('created')
          this.$emit('update:isCreating', false)
        })
        .catch(() => {
          this.$message.error('创建主机失败')
          this.$emit('update:isCreating', false)
        })
    }
  }
}
</script>

<style scoped>

</style>
