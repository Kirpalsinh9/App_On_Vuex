import { ethers } from 'ethers'

let listOfBlocks = []

// number of leading zeros necessary for a valid block
// Proof Of Work / PoW
// unused value right now
// TODO: use this value in code
//const BC_DIFFICULTY = 4

// hashesBlock
function hashBlock(bl) {
  let stringifiedBl = JSON.stringify(bl)
  let hexifiedBl = toHex(stringifiedBl)
  return ethers.utils.keccak256('0x' + hexifiedBl)
}

// checks that block hashes to correct value
function verifyBlock(bl) {
  let hashOfBl = bl.hash
  let blWithoutHash = {
    timestamp: bl.timestamp,
    data: bl.data,
    previous_hash: bl.previous_hash,
    number: bl.number,
    nonce: bl.nonce
  }

  let hashOfBlWithoutHash = hashBlock(blWithoutHash)
  return hashOfBlWithoutHash === hashOfBl
}

//function verifyAllBlocks(bc) {
// for (let i = 0; i < listOfBlocks.length; i++) {
//  if (verifyBlock(listOfBlocks[i]) === false) {
//   return false
//}
//}
//  return true
//}

// calculates a nonce for a given block
function calculateNonce(bl) {
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

// calculates nonce and hash for input values and returns a new block
// data structure
function createBlock(timestamp, prevHash, data, number) {
  let returnBl = {
    timestamp: timestamp,
    data: data,
    previous_hash: prevHash,
    number: number
  }
  let nonce = calculateNonce(returnBl)
  returnBl['nonce'] = nonce
  let hash = hashBlock(returnBl)
  returnBl['hash'] = hash
  return returnBl
}

// creates a new block and appends it to listOfBlocks
function createBlockAndAddToList(data) {
  let prevHash = ''
  let number = 0
  if (listOfBlocks.length != 0) {
    let prevBl = listOfBlocks[listOfBlocks.length - 1]
    prevHash = prevBl.hash
    number = prevBl.number + 1
  }

  let newBlock = createBlock(Date.now(), prevHash, data, number)
  listOfBlocks.push(newBlock)
}

// https://stackoverflow.com/a/26375459
function toHex(str) {
  var result = ''
  for (var i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16)
  }
  return result
}

// modify data in specified block, rehashes block, and
// modifies the previous_hash field and hash field in all subsequent blocks
function modifyData(blNumber, newData) {
  listOfBlocks[blNumber]['data'] = newData
  let newHashValue = hashBlock(listOfBlocks[blNumber])
  listOfBlocks[blNumber]['hash'] = newHashValue
  for (let i = blNumber + 1; i < listOfBlocks.length; i++) {
    listOfBlocks[i].previous_hash = listOfBlocks[i - 1].hash
    listOfBlocks[i].hash = hashBlock(listOfBlocks[i])
  }
}

// takes an invalid block as a parameter, and creates a new block with
// valid nonce and hash
function revalidateBlock(bl) {
  return createBlock(bl.timestamp, bl.previous_hash, bl.data, bl.number)
}
export {
  createBlock,
  createBlockAndAddToList,
  hashBlock,
  revalidateBlock,
  toHex,
  calculateNonce,
  modifyData,
  verifyBlock
}
