<template>
  <div class="bl">
    <b-form @submit="Addblock">
      <b-input-group prepend="Data" class="mb-2 mr-sm-2 mb-sm-0">
        <b-input placeholder="EnterData" v-model="data1" />
      </b-input-group>
      <button type="submit" class="btn1">Add New Block</button>
    </b-form>
  </div>
</template>
<script>
export default {
  name: 'Addblock',
  computed: {
    data1: {
      get() {
        return this.$store.state.data1
      },
      set(value) {
        this.$store.commit('setdata', value)
      }
    }
  },
  methods: {
    Addblock(event) {
      event.preventDefault()
     //adding block to the main blockchain
      this.$store.dispatch('createBlock', this.data1)
    }
  }
}
</script>
<style>
.bl {
  width: 400px;
  height: 200px;
  margin: 250px 450px;
  background-color: whitesmoke;
  text-align: left;
  padding: 20px;
  border-radius: 25px;
}
.btn1 {
  margin: 50px 50px 50px 120px;
  border-radius: 25px;
}
</style>
