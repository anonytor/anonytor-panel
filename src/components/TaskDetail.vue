<template>
  <div>
    <template v-if="!isNotFound">
      <a-page-header class="task-header"
                     :title="isLoading ? '加载中...' : '任务：' + taskId"
                     @back="() => $router.go(-1)">
        <a-skeleton active v-if="isLoading" />
        <a-descriptions size="small" :column="2" v-else>
          <a-descriptions-item label="主机 ID">
            {{ hostId }}
          </a-descriptions-item>
          <a-descriptions-item label="状态">
            <a-tag color="gray" v-if="status === $const.task_status.initialized">已初始化</a-tag>
            <a-tag color="gray" v-else-if="status === $const.task_status.sent">已发送</a-tag>
            <a-tag color="yellow" v-else-if="status === $const.task_status.received">已接收命令</a-tag>
            <a-tag color="yellow" v-else-if="status === $const.task_status.wantRetrieveThroughTrans">请求进行传输连接</a-tag>
            <a-tag color="green" v-else-if="status === $const.task_status.transConnEstablished">传输连接已建立</a-tag>
            <a-tag color="blue" v-else-if="status === $const.task_status.finished">已完成</a-tag>
            <a-tag color="red" v-else>错误</a-tag>
          </a-descriptions-item>
        </a-descriptions>
      </a-page-header>
      <a-row type="flex" justify="space-between" style="margin-top: 10px" v-if="!isLoading">
        <a-col :span="24">
          <a-card title="输出">
            <template v-if="status === $const.task_status.transConnEstablished || status === $const.task_status.finished">
              <img :src="$store.state.serverUrl + '/' + result" alt="" v-if="cmd === $const.cmd.getScreenshot" height="600">
              <a-button type="primary" @click="redirect($store.state.serverUrl + '/' + result)" v-else-if="cmd === $const.cmd.getFileContent">下载文件</a-button>
              <pre v-else>{{ result }}</pre>
            </template>
            <span v-else>暂无输出</span>
          </a-card>
        </a-col>
      </a-row>
    </template>
    <a-result status="404" title="未找到任务" v-else>
      <template #extra>
        <a-button type="primary" @click="$router.go(-1)">
          返回
        </a-button>
      </template>
    </a-result>
  </div>
</template>

<script>
import api from '../api'
export default {
  name: 'TaskDetail',
  data () {
    return {
      isLoading: true,
      isNotFound: false,
      status: 0,
      result: '',
      cmd: 0,
      interval: null
    }
  },
  methods: {
    load () {
      this.isLoading = true
      this.isNotFound = false
      api.task.getStatus(this.hostId, this.taskId)
        .then(res => {
          this.cmd = res.data.cmd
          this.result = res.data.result
          this.status = res.data.task_status
          if ((this.status === this.$const.task_status.finished || this.status === this.$const.task_status.errorInExecution) && this.interval !== null) {
            clearInterval(this.interval)
            this.interval = null
          }
        })
        .catch(err => {
          if (this.interval !== null) {
            clearInterval(this.interval)
            this.interval = null
          }
          if (err.response.status === 404) {
            this.isNotFound = true
            this.$message.error(`未找到任务 ${this.taskId}`)
          } else {
            this.$message.error(`获取任务 ${this.taskId} 信息失败`)
          }
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    redirect (url) {
      window.location = url
    }
  },
  watch: {
    hostId () {
      this.load()
    },
    taskId () {
      this.load()
    }
  },
  computed: {
    hostId () {
      return this.$route.params.hostId
    },
    taskId () {
      return this.$route.params.taskId
    }
  },
  mounted () {
    this.load()
    this.interval = setInterval(this.load, 1000)
  }
}
</script>

<style scoped>
.task-header {
  border: 1px solid rgb(235, 237, 240);
  background-color: #ffffff;
}
</style>
