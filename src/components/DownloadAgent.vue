<template>
  <a-row type="flex" justify="space-around">
    <a-col :span="6">
      <a-card hoverable :bordered="false" style="text-align: center">
        <a-icon type="android" slot="cover" class="icon icon-android"/>
        <a-card-meta title="Android"/>
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card hoverable :bordered="false" style="text-align: center">
        <a-icon type="windows" slot="cover" class="icon icon-windows"/>
        <a-card-meta title="Windows"/>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'DownloadAgent'
}
</script>

<style scoped>
.icon {
  font-size: 50px;
  padding-top: 20px;
}
.icon-android {
  color: #3eda84;
}
.icon-windows {
  color: #0179d7;
}
</style>
