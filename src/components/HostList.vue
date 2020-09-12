<template>
  <div>
    <a-row class="row">
      <a-space size="small">
        <a-button type="primary" icon="plus" @click="isCreateHostVisible = true">添加主机</a-button>
      </a-space>
    </a-row>
    <a-modal title="添加主机"
             ok-text="添加"
             cancel-text="取消"
             :visible="isCreateHostVisible"
             :closable="!isCreating"
             :keyboard="!isCreating"
             :maskClosable="!isCreating"
             :destroyOnClose="true"
             :ok-button-props="{ props: { disabled: isCreating } }"
             :cancel-button-props="{ props: { disabled: isCreating } }"
             @ok="$refs.createHost.create()"
             @cancel="isCreateHostVisible = false">
      <CreateHost ref="createHost" :isCreating.sync="isCreating" @created="refreshList(); isCreateHostVisible = false"/>
    </a-modal>
    <a-modal title="下载 Agent"
             :footer="null"
             :visible="isDownloadAgentVisible"
             @cancel="isDownloadAgentVisible = false">
      <DownloadAgent :id="activeDownloadAgentId" :os="activeDownloadAgentOs"/>
    </a-modal>
    <a-row class="row">
      <a-table :data-source="hosts" row-key="id" :loading="isLoading">
        <a-table-column key="id" title="ID" data-index="id">
          <template slot-scope="text, record">
            <a @click="$router.push({ name: 'hostDetail', params: { id: text } })">{{ text }}</a>
          </template>
        </a-table-column>
        <a-table-column key="name" title="名称" data-index="name"/>
        <a-table-column key="addr" title="地址" data-index="addr"/>
        <a-table-column key="os" title="操作系统" data-index="os">
          <template slot-scope="text, record">
            <span v-if="text === 0">Windows</span>
            <span v-else>Android</span>
          </template>
        </a-table-column>
        <a-table-column key="status" title="连接状态" data-index="status">
          <template slot-scope="text, record">
            <span v-if="text">已连接</span>
            <span v-else>未连接</span>
          </template>
        </a-table-column>
        <a-table-column key="last_seen" title="上次活跃时间" data-index="last_seen">
          <template slot-scope="text, record">
            <template v-if="text === '0001-01-01T00:00:00Z'">从未连接</template>
            <template v-else>{{ new Date(text).toLocaleString() }}</template>
          </template>
        </a-table-column>
        <a-table-column key="action" title="操作">
          <template slot-scope="text, record">
            <a-space>
              <a-button type="primary" v-if="!record.status" size="small" @click="showDownloadAgent(record.id, record.os)">下载 Agent</a-button>
              <a-button type="primary" v-else size="small" @click="$router.push({ name: 'hostDetail', params: { id: record.id } })">控制</a-button>
              <a-button type="danger" size="small" @click="deleteHost(record.id)" :disabled="isDeleting">删除</a-button>
            </a-space>
          </template>
        </a-table-column>
      </a-table>
    </a-row>
  </div>
</template>

<script>
import api from '../api'
import CreateHost from './CreateHost'
import DownloadAgent from './DownloadAgent'
export default {
  name: 'HostList',
  components: { DownloadAgent, CreateHost },
  data () {
    return {
      hosts: [],
      isLoading: true,
      isCreateHostVisible: false,
      isCreating: false,
      isDownloadAgentVisible: false,
      isDeleting: false,
      activeDownloadAgentId: '',
      activeDownloadAgentOs: 0
    }
  },
  methods: {
    showDownloadAgent (id, os) {
      this.activeDownloadAgentId = id
      this.activeDownloadAgentOs = os
      this.isDownloadAgentVisible = true
    },
    refreshList () {
      this.isLoading = true
      api.host.getList()
        .then(res => {
          this.hosts = res.data.hosts
        })
        .catch(() => {
          this.$message.error('获取主机列表失败')
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    deleteHost (id) {
      this.isDeleting = true
      api.host.delete(id)
        .then(() => {
          this.refreshList()
          this.$message.success(`成功删除主机 ${id}`)
        })
        .catch(() => {
          this.$message.error(`删除主机 ${id} 失败`)
        })
        .finally(() => {
          this.isDeleting = false
        })
    }
  },
  mounted () {
    this.refreshList()
  }
}
</script>

<style scoped>
.row:not(:first-child) {
  margin-top: 10px;
}
</style>
