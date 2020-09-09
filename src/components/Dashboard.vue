<template>
  <div style="height: 100%">
    <a-layout style="height: 100%">
      <a-layout-sider breakpoint="lg"
                      v-model="collapsed"
                      collapsible>
        <Sidebar :collapsed="collapsed"/>
      </a-layout-sider>
      <a-layout>
        <a-layout-header id="header"><Header/></a-layout-header>
        <a-layout-content class="content">
          <router-view></router-view>
          <div v-if="$route.name === 'dashboard'">
            <a-row type="flex" justify="space-around">
              <a-col :span="4">
                <a-statistic title="添加的主机" :value="hostCount" :disabled="isLoading"/>
              </a-col>
              <a-col :span="4">
                <a-statistic title="活跃连接数" :value="connectionCount" :disabled="isLoading"/>
              </a-col>
              <a-col :span="4">
                <a-statistic title="执行的操作数" value="*"/>
              </a-col>
            </a-row>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import api from '../api'
import Sidebar from './Sidebar'
import Header from './Header'
export default {
  name: 'Dashboard',
  components: { Sidebar, Header },
  data () {
    return {
      isLoading: true,
      collapsed: false,
      hostCount: 0,
      connectionCount: 0
    }
  },
  methods: {
    loadInfo () {
      this.isLoading = true
      api.info()
        .then(res => {
          this.hostCount = res.data.hostCount
          this.connectionCount = res.data.connectionCount
        })
        .catch(() => {
          this.$message.error('获取概要信息失败')
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  },
  watch: {
    routeName (to) {
      if (to === 'dashboard') {
        this.loadInfo()
      }
    }
  },
  computed: {
    routeName () {
      return this.$route.name
    }
  },
  mounted () {
    if (this.$route.name === 'dashboard') {
      this.loadInfo()
    }
  }
}
</script>

<style scoped>
#header {
  background-color: white;
}
.content {
  margin: 20px 20px;
}
</style>
