<template>
  <div>
    <a-row class="row">
      <a-space size="small">
        <a-button type="primary" icon="plus" @click="isAddHostVisible = true">添加主机</a-button>
      </a-space>
    </a-row>
    <a-modal title="添加主机"
             ok-text="添加"
             cancel-text="取消"
             :visible="isAddHostVisible"
             :closable="!isAdding"
             :keyboard="!isAdding"
             :maskClosable="!isAdding"
             :destroyOnClose="true"
             :ok-button-props="{ props: { disabled: isAdding } }"
             :cancel-button-props="{ props: { disabled: isAdding } }"
             @ok="$refs.addHost.add()"
             @cancel="isAddHostVisible = false">
      <AddHost ref="addHost" v-bind:isAdding.sync="isAdding" @added="isAddHostVisible = false"/>
    </a-modal>
    <a-modal title="下载 Agent"
             :footer="null"
             :visible="isDownloadAgentVisible"
             @cancel="isDownloadAgentVisible = false">
      <DownloadAgent/>
    </a-modal>
    <a-row class="row">
      <a-table :data-source="hosts" row-key="id">
        <a-table-column key="id" title="ID" data-index="id"/>
        <a-table-column key="name" title="名称" data-index="name"/>
        <a-table-column key="addr" title="地址" data-index="addr"/>
        <a-table-column key="os_info" title="操作系统" data-index="os_info"/>
        <a-table-column key="status" title="连接状态" data-index="status">
          <template slot-scope="text, record">
            <span v-if="text">已连接</span>
            <span v-else>未连接</span>
          </template>
        </a-table-column>
        <a-table-column key="last_seen" title="上次活跃时间" data-index="last_seen"/>
        <a-table-column key="action" title="操作">
          <template slot-scope="text, record">
            <a-space>
              <a-button type="primary" v-if="!record.status" size="small" @click="showDownloadAgent(record.id)">下载 Agent</a-button>
              <a-button type="primary" v-else size="small" @click="$router.push({ name: 'hostDetail', params: { id: record.id } })">控制</a-button>
              <a-button type="danger" size="small">删除</a-button>
            </a-space>
          </template>
        </a-table-column>
      </a-table>
    </a-row>
  </div>
</template>

<script>
import AddHost from './AddHost'
import DownloadAgent from './DownloadAgent'
export default {
  name: 'HostList',
  components: { DownloadAgent, AddHost },
  data () {
    return {
      hosts: [
        {
          id: 'e13a3957-0b4e-4ec5-8001-969fe4fc7734',
          name: 'Android 1',
          addr: '127.0.0.1:1234',
          os_info: 'Android 10.0',
          status: false,
          last_seen: new Date().toLocaleString()
        },
        {
          id: 'e13a3957-0b4e-4ec5-8001-969fe4fc7735',
          name: 'Android 12',
          addr: '127.0.0.1:1235',
          os_info: 'Android 12',
          status: true,
          last_seen: new Date().toLocaleString()
        }
      ],
      isAddHostVisible: false,
      isAdding: false,
      isDownloadAgentVisible: false
    }
  },
  methods: {
    showDownloadAgent (id) {
      this.isDownloadAgentVisible = true
    }
  }
}
</script>

<style scoped>
.row:not(:first-child) {
  margin-top: 10px;
}
</style>
