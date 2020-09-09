<template>
  <div style="height: 64px">
    <a-button type="link" style="height: 100%; color: black; font-size: 12px">
      连接状态：
      <a-tag color="red" v-if="status === 0">检查中</a-tag>
      <a-tag color="green" v-else-if="status === 1">已连接</a-tag>
      <a-tag v-if="status === 2">已断开</a-tag>
    </a-button>
    <a-button type="link" style="height: 100%; float: right" @click="$router.push({ name: 'auth' })">退出</a-button>
  </div>
</template>

<script>
import api from '../api'
export default {
  name: 'Header',
  data () {
    return {
      status: 0
    }
  },
  mounted () {
    this.status = 0
    api.ping()
      .then(() => {
        this.status = 1
      })
      .catch(() => {
        this.status = 2
      })
  }
}
</script>

<style scoped>

</style>
