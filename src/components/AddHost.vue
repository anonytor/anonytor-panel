<template>
  <a-form-model layout="vertical">
    <a-form-model-item label="名称">
      <a-input v-model="name" :disabled="isAdding"></a-input>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
export default {
  name: 'AddHost',
  props: {
    isAdding: Boolean
  },
  data () {
    return {
      name: ''
    }
  },
  methods: {
    add () {
      this.$emit('update:isAdding', true)
      setTimeout(() => {
        this.$emit('added')
        this.$emit('update:isAdding', false)
      }, 3000)
    }
  }
}
</script>

<style scoped>

</style>
