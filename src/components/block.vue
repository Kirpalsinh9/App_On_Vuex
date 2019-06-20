<template>
  <div>
    <div v-if="showblocks">
      <div class="blckdiv" v-for="(block, index) in blockchain1" :key="index">
        <b-card>
          <b-form
            >Data:
            <b-form-input
              @keyup="modifyData(block.number)"
              :value="block.data"
            />

            <b-card-text>Previous Hash:{{ block.previous_hash }}</b-card-text>

            <b-card-text>Hash:{{ block.hash }}</b-card-text>

            <b-card-text>Time:{{ block.timestamp }}</b-card-text>
            <b-card-text>Block: {{ block.number }}</b-card-text>
            <p class="nonce">{{ block.nonce }}</p>
            <button v-if="Value" v-on:click.prevent="Revalidation(block.number)">
              REMINE
            </button>
          </b-form>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { hashBlock } from '@/assets/app'

import { calculateNonce } from '@/assets/app'


export default {
  name: 'block',
 
  computed: {
    // return the blockchain from the state attribute in the store
    blockchain1() {
      return this.$store.state.blockchain
    },
    // returns showblock from the state in the store
    showblocks() {
      return this.$store.state.showblocks
    },
    // returns the value from store inorder to handle remine button
    Value() {
      return this.$store.state.Value
    }
  },
  methods: {
    // As soon as the data is changed the hash value gets recalculated and modifyData function is called
    modifyData(index) {
      
      
      let newHashValue = hashBlock(this.$store.state.blockchain[index])

      this.$store.state.blockchain[index]['hash'] = newHashValue

      for (let i = index + 1; i < this.$store.state.blockchain.length; i++) {
        this.$store.state.blockchain[i].previous_hash = this.$store.state.blockchain[i - 1].hash
        this.$store.state.blockchain[i].hash = hashBlock(
          this.$store.state.blockchain[i]
        )
      }
      return (this.$store.state.Value = true)
    },
    // As the hash value is not valid because it is not below the target value it has to beremined so an on click event triggers the Revalidation method
    Revalidation(index) {
     
      
      let newBlk = {
        timestamp: this.$store.state.blockchain[index]['timestamp'],
        data: this.$store.state.blockchain[index]['data'],
        previous_hash: this.$store.state.blockchain[index]['previous_hash'],

        number: this.$store.state.blockchain[index]['number']
      }
      let newnounce = calculateNonce(newBlk)
      newBlk['nonce'] = newnounce
      let newhash = hashBlock(newBlk)
      this.$store.state.blockchain[index].hash = newhash
       for (let i = index + 1; i < this.$store.state.blockchain.length; i++)
       {    console.log(i)
          this.$store.state.blockchain[i].previous_hash = this.$store.state.blockchain[i - 1].hash
       }



        
      
    }
  }
    }
</script>
<style>
.blckdiv {
  width: 500px;
  height: 500px;
  margin: 100px 450px;
  background-color: whitesmoke;
  text-align: left;
  border-radius: 25px;
  padding: 40px 10px;
  box-shadow: 10px 10px grey;
}
.nonce {
  width: 55px;
  height: 35px;
  border: solid 2px;
  float: right;
  padding: 2px 4px;
}
</style>
