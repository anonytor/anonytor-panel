<template>
  <div>
    <a-row type="flex" :gutter="20" justify="center">
      <a-col :span="10">
        <a-row type="flex" justify="center" align="middle">
          <Logo/>
        </a-row>
        <a-row type="flex" justify="center">
          <h2 id="title">控制面板</h2>
        </a-row>
        <a-row>
          <a-spin :spinning="isLoading" tip="正在验证">
            <a-card>
              <a-form-model layout="vertical">
                <a-form-model-item label="服务器地址">
                  <a-input v-model="serverUrl" :disabled="isLoading"></a-input>
                </a-form-model-item>
                <a-form-model-item label="Token">
                  <a-input v-model="token" :disabled="isLoading"></a-input>
                </a-form-model-item>
                <a-form-model-item>
                  <a-button type="primary" @click="auth" style="width: 100%" :disabled="isLoading">连接</a-button>
                </a-form-model-item>
              </a-form-model>
            </a-card>
          </a-spin>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import api from '../api'
import Logo from './Logo'
export default {
  name: 'Auth',
  components: { Logo },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    auth () {
      this.isLoading = true
      api.ping()
        .then(() => {
          this.$message.success('验证成功，等待跳转')
          this.$router.push({ name: 'dashboard' })
          this.isLoading = false
        })
        .catch(err => {
          console.log(err)
          this.$message.error('验证失败，请检查信息')
          this.isLoading = false
        })
    }
  },
  computed: {
    serverUrl: {
      get () {
        return this.$store.state.serverUrl
      },
      set (val) {
        this.$store.commit('updateServerUrl', val)
      }
    },
    token: {
      get () {
        return this.$store.state.token
      },
      set (val) {
        this.$store.commit('updateToken', val)
      }
    }
  }
}
</script>

<style scoped>
#title {
  color: dimgray;
  margin-top: 5px;
  margin-bottom: 20px;
}
</style>
