import { ethers } from 'ethers'
//string to hex
function toHex(str) {
  var result = ''
  for (var i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16)
  }
  return result
}
//hashes the block
function hashBlock(bl) {
  let stringifiedBl = JSON.stringify(bl)
  let hexifiedBl = toHex(stringifiedBl)
  return ethers.utils.keccak256('0x' + hexifiedBl)
}
//Calculates nonce for the block
export function calculateNonce(bl) {
  let clonedBl = JSON.parse(JSON.stringify(bl))
  let nonce = 0
  clonedBl['nonce'] = nonce
  let hash = hashBlock(clonedBl)
  while (!(hash.substring(2, 5) === '000')) {
    nonce++
    clonedBl['nonce'] = nonce
    hash = hashBlock(clonedBl)
  }
  return nonce
}
