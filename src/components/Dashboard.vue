<template>
  <a-layout style="height: 100%">
    <a-layout-sider breakpoint="lg"
                    v-model="collapsed"
                    collapsible>
      <Sidebar/>
    </a-layout-sider>
    <a-layout>
      <a-layout-header id="header"><Header/></a-layout-header>
      <a-layout-content class="content">
        <router-view></router-view>
        <div v-if="$route.name === 'dashboard'">
          <a-row type="flex" justify="space-around">
            <a-col :span="4">
              <a-statistic title="添加的主机" :value="1"/>
            </a-col>
            <a-col :span="4">
              <a-statistic title="活跃连接数" :value="10"/>
            </a-col>
            <a-col :span="4">
              <a-statistic title="执行的操作数" :value="5"/>
            </a-col>
          </a-row>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import Sidebar from './Sidebar'
import Header from './Header'
export default {
  name: 'Dashboard',
  components: { Sidebar, Header },
  data () {
    return {
      collapsed: false
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
