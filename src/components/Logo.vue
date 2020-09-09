<template>
  <h1 id="logo">
    <span id="logo-a">A</span><span id="logo-nony">nony</span><span id="logo-tor">tor</span>
    <span id="logo-mous" class="hidden-xs-only" v-if="!simple">mous</span>
    <span id="logo-moni" class="hidden-xs-only" v-if="!simple">moni</span>
  </h1>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    simple: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
#logo {
  display: block;
  position: relative;
  margin: 0;
}
#logo-a {
  color: orangered;
  font-size: 45px;
}
#logo-nony {
  color: orange;
}
#logo-tor {
  color: dodgerblue;
  position: relative;
  top: 10px;
}
#logo-mous {
  color: coral;
  font-size: 20px;
  position: absolute;
  left: 100px;
  top: 20px;
}
#logo-moni {
  color: deepskyblue;
  font-size: 20px;
  position: absolute;
  left: 50px;
  top: 45px;
}
</style>
