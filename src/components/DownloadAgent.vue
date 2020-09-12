<template>
  <a-spin :spinning="isLoading" tip="正在生成 Agent">
    <a-row type="flex" justify="center">
      <a-col :span="6" v-if="os === 1">
        <a-card hoverable :bordered="false" style="text-align: center" @click="download(1)">
          <a-icon type="android" slot="cover" class="icon icon-android"/>
          <a-card-meta title="Android"/>
        </a-card>
      </a-col>
      <a-col :span="6" v-else>
        <a-card hoverable :bordered="false" style="text-align: center" @click="download(0)">
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
    id: String,
    os: Number
  },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    download (os) {
      if (this.os !== os) {
        return
      }
      this.isLoading = true
    }
  }
}
</script>

<style>
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
