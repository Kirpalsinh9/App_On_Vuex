<template>
  <div>
    <button class="btn2" type="submit" v-on:click="reset">
      Reset Blockchain
    </button>
  </div>
</template>
<script>
export default {
  name: 'reset',
  methods: {
    reset(event) {
      event.preventDefault()
      this.$store.commit('setshowmain', true)
      this.$store.commit('setshowblocks', false)
      this.$store.commit('resetblocks')
    }
  }
}
</script>
<style>
.btn2 {
  margin: 30px 40px 0px 0px;
  float: right;
}
</style>
