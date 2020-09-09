<template>
  <div>
    <div class="logo">
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
  methods: {
    redirect ({ key }) {
      this.$router.push({ name: key })
    }
  }
}
</script>

<style scoped>
.logo {
  background-color: dimgray;
  height: 28px;
  font-size: 24px;
  margin: 16px;
}
</style>
