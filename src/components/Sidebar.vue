<template>
  <div>
    <div class="logo" :style="{ fontSize }">
      Anonytor Panel
    </div>
    <a-menu theme="dark" :selected-keys="[ $route.name ]" @click="redirect">
      <a-menu-item key="dashboard">
        <a-icon type="appstore" />
        <span>控制台</span>
      </a-menu-item>
      <a-menu-item key="hostList">
        <a-icon type="database" />
        <span>主机</span>
      </a-menu-item>
      <a-menu-item key="tokenList">
        <a-icon type="key" />
        <span>Token</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    collapsed: Boolean
  },
  methods: {
    redirect ({ key }) {
      this.$router.push({ name: key })
    }
  },
  computed: {
    fontSize () {
      return this.collapsed ? '14px' : '24px'
    }
  }
}
</script>

<style scoped>
.logo {
  color: white;
  height: 28px;
  margin: 16px;
}
</style>
