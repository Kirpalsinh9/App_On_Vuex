import Vue from 'vue'
import Vuex from 'vuex'
//importing the function for creating the block
import { createBlock } from './assets/app.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Value: false,
    data1: '',
    showmain: true,
    showblocks: false,
    blockchain: [
      {
        data: 'Welcome to the Blockchain',
        hash:
          '0x00064e438a7853838938c9b29f2476ccc1ae37234890666fa2dda278f23c9953',
        previous_hash: '0',
        timestamp: 'Thu Mar 16 2019 17:16:51 GMT-0400',
        number: 0,
        nonce: '4339'
      }
    ]
  },
  mutations: {
    setdata(state, payload) {
      state.data1 = payload
    },
    setblockchain(state, payload) {
      state.blockchain = payload
    },
    addCurrentBlock(state, payload) {
      state.blockchain.push(payload)
    },
    setshowmain(state, payload) {
      state.showmain = payload
    },
    setshowblocks(state, payload) {
      state.showblocks = payload
    },
    resetblocks(state) {
      state.blockchain.length = 1
    }
  },
  actions: {
    createBlock({ commit }) {
      let prevHash = ''
      let number = 0
      if (this.state.blockchain.length != 0) {
        let prevBl = this.state.blockchain[this.state.blockchain.length - 1]
        prevHash = prevBl.hash
        number = prevBl.number + 1
      }
      //to get the time and date in a readable way
      function timeStamp() {
        var date = Date(Date.now())
        var a = date.toString()
        return a
      }
      let newBlock = createBlock(
        timeStamp(),
        prevHash,
        this.state.data1,
        number
      )

      commit('addCurrentBlock', newBlock)
      commit('setshowmain', false)
      commit('setshowblocks', true)
    }
  }
})
