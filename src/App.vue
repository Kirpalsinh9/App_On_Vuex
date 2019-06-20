<template>
  <div id="app">
    <reset />
    <Blockchain />
    <block />
    <Addblock />
  </div>
</template>

<script>
import Blockchain from './components/Blockchain.vue'
import Addblock from './components/Addblock.vue'
import block from './components/block.vue'
import reset from './components/reset.vue'
export default {
  name: 'app',
  components: {
    Blockchain,
    Addblock,
    block,
    reset
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
