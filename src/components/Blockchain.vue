<template>
  <div v-if="showgen">
    <div class="mainbl">
      <b-card>
        <b-form>
          <b-input-group prepend="Data">
            <b-form-input v-model="data" readonly />
          </b-input-group>
          <b-card-text>Previous Hash:{{ previousHash }}</b-card-text>

          <b-card-text>Hash:{{ genesisblock.hash }}</b-card-text>

          <b-card-text>Time:{{ timeStamp }}</b-card-text>
          <b-card-text class="nonce">{{ genesisblock.nonce }}</b-card-text>
          <b-card-text>
            <b>Genesis Block</b>
          </b-card-text>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
import { createBlock } from '@/assets/app'

export default {
  name: 'Blockchain',
  data() {
    return {
      data: 'Welcome to the Blockchain',
      previousHash: '0',
      number: 0,
      genesisblock: '',
      timeStamp: 'Thu Mar 16 2019 17:16:51 GMT-0400'
    }
  },
  computed: {
    showgen() {
      return this.$store.state.showmain
    }
  },
  mounted() {
    this.genesisblock = createBlock(
      this.timeStamp,
      this.data1,
      this.previousHash,
      this.number
    )
  },
  methods: {}
}
</script>

<style>
.mainbl {
  width: 500px;
  height: 400px;
  margin: 100px 450px;
  background-color: whitesmoke;
  text-align: left;
  border-radius: 25px;
  padding: 50px 10px;
  box-shadow: 10px 10px grey;
}
.nonoce {
  float: right;
  height: 20px;
  width: 20px;
}
</style>
