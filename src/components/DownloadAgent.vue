<template>
  <a-spin :spinning="isLoading" tip="正在编译 Agent">
    <a-row type="flex" justify="space-around">
      <a-col :span="6">
        <a-card hoverable :bordered="false" style="text-align: center" @click="download('android')">
          <a-icon type="android" slot="cover" class="icon icon-android"/>
          <a-card-meta title="Android"/>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card hoverable :bordered="false" style="text-align: center" @click="download('windows')">
          <a-icon type="windows" slot="cover" class="icon icon-windows"/>
          <a-card-meta title="Windows"/>
        </a-card>
      </a-col>
    </a-row>
    <a-row type="flex" justify="center">
      ID: {{ id }}
    </a-row>
  </a-spin>
</template>

<script>
export default {
  name: 'DownloadAgent',
  props: {
    id: String
  },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    download (os) {
      this.isLoading = true
    }
  }
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
