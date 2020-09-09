<template>
  <div>
    <a-modal title="创建 Token"
             ok-text="创建"
             cancel-text="取消"
             :visible="isCreateTokenVisible"
             :closable="!isCreating"
             :keyboard="!isCreating"
             :maskClosable="!isCreating"
             :destroyOnClose="true"
             :ok-button-props="{ props: { disabled: isCreating } }"
             :cancel-button-props="{ props: { disabled: isCreating } }"
             @ok="$refs.createToken.create()"
             @cancel="isCreateTokenVisible = false">
      <CreateToken ref="createToken" :isCreating.sync="isCreating" @created="refreshList(); isCreateTokenVisible = false"/>
    </a-modal>
    <a-row class="row">
      <a-space size="small">
        <a-button type="primary" icon="plus" @click="isCreateTokenVisible = true">创建Token</a-button>
      </a-space>
    </a-row>
    <a-row class="row">
      <a-table :data-source="tokens" :loading="isLoading" rowKey="token">
        <a-table-column key="token" title="Token" data-index="token"/>
        <a-table-column key="created_at" title="创建时间" data-index="created_at">
          <template slot-scope="text, record">
            {{ new Date(text).toLocaleString() }}
          </template>
        </a-table-column>
        <a-table-column key="expired_at" title="过期时间" data-index="expired_at">
          <template slot-scope="text, record">
            {{ new Date(text).toLocaleString() }}
          </template>
        </a-table-column>
        <a-table-column key="action" title="操作">
          <template slot-scope="text, record">
            <a-space size="small">
              <a-button type="danger" @click="deleteToken(record.token)" :disabled="isDeleting">回收</a-button>
            </a-space>
          </template>
        </a-table-column>
      </a-table>
    </a-row>
  </div>
</template>

<script>
import api from '../api'
import CreateToken from './CreateToken'
export default {
  name: 'TokenList',
  components: { CreateToken },
  data () {
    return {
      tokens: [],
      isLoading: true,
      isCreateTokenVisible: false,
      isCreating: false,
      isDeleting: false
    }
  },
  methods: {
    refreshList () {
      this.isLoading = true
      api.token.getList()
        .then(res => {
          this.tokens = res.data.tokens
        })
        .catch(() => {
          this.$message.error('获取 Token 列表失败')
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    createToken () {
      this.isCreating = true
    },
    deleteToken (token) {
      this.isDeleting = true
      api.token.delete({ token })
        .then(() => {
          this.refreshList()
          this.$message.success(`成功回收 Token ${token}`)
        })
        .catch(() => {
          this.$message.error(`回收 Token ${token} 失败`)
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
