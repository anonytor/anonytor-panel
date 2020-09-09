<template>
  <div>
    <a-row class="row">
      <a-space size="small">
        <a-button type="primary" icon="plus">创建Token</a-button>
      </a-space>
    </a-row>
    <a-row class="row">
      <a-table :data-source="tokens">
        <a-table-column key="id" title="ID" data-index="id"/>
        <a-table-column key="token" title="Token" data-index="token"/>
        <a-table-column key="createdAt" title="创建时间" data-index="created_at"/>
        <a-table-column key="expiredAt" title="过期时间" data-index="expired_at"/>
        <a-table-column key="action" title="操作">
          <template slot-scope="text, record">
            <a-space size="small">
              <a-button type="danger">回收</a-button>
            </a-space>
          </template>
        </a-table-column>
      </a-table>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'TokenList',
  data () {
    return {
      tokens: [
        {
          id: 1,
          token: '01234567890123456789012345678912',
          created_at: new Date().toLocaleString(),
          expired_at: new Date().toLocaleString()
        }
      ]
    }
  }
}
</script>

<style scoped>
.row:not(:first-child) {
  margin-top: 10px;
}
</style>
