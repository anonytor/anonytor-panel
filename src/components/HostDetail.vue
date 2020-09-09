<template>
  <div>
    <a-page-header class="host-header"
                   :title="'主机：' + host.name"
                   :sub-title="host.id"
                   @back="() => $router.go(-1)">
      <template slot="extra">
        <a-button key="1" type="primary">
          下载 Agent
        </a-button>
        <a-button key="2" type="danger">
          删除
        </a-button>
      </template>
      <a-descriptions size="small" :column="2">
        <a-descriptions-item label="创建时间">
          {{ host.created_at }}
        </a-descriptions-item>
        <a-descriptions-item label="上一次活跃时间">
          {{ host.last_seen }}
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
    <a-row type="flex" justify="space-between" style="margin-top: 10px">
      <a-col :md="15" :xs="24" style="margin-bottom: 10px">
        <a-card
          title="控制"
          :tab-list="windowsControlTabList"
          :active-tab-key="activeTabKey" @tabChange="key => activeTabKey = key">
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
        </a-card>
      </a-col>
      <a-col :md="8" :xs="24">
        <a-card title="连接状态" :bodyStyle="{ padding: '0 5px' }">
          <a-table :data-source="connections" :show-header="false">
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
  </div>
</template>

<script>
export default {
  name: 'HostDetail',
  data () {
    return {
      host: {
        id: 'e13a3957-0b4e-4ec5-8001-969fe4fc7734',
        name: 'Android 1',
        addr: '127.0.0.1:1234',
        os_info: 'Android 10.0',
        status: false,
        last_seen: new Date().toLocaleString(),
        created_at: new Date().toLocaleString()
      },
      connections: [
        {
          addr: '127.0.0.1:1234',
          type: 0
        }
      ],
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
      activeTabKey: 'windowsFile'
    }
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
