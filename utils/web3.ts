import { formatUnits as formatUnitsViem } from 'viem'
import {formatEther as formatEtherViem} from 'viem'
import {getAddress as getAddressViem} from 'viem'
export { parseEther, formatEther, parseUnits, getAddress } from 'viem'

export const formatUnits = function (val, precision = 18, fraction = 4) {
  if (!val)
    return ''
  val = formatUnitsViem(val, precision).toString()
  val = val.split('.')
  if (!val[1]) {
    return val[0]
  }
  val = `${val[0]}.${val[1].substr(0, fraction)}`
  return val
}

// 37462 => 37.5K
export const numberFormat = (num, fraction = 6) => {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: fraction, notation: 'compact', compactDisplay: 'short' }).format(num)
}

export const humanFormatEther = (num) => {
  return numberFormat(formatEtherViem(num))
}

export const shortAddress = (address, totalLen = 12) => {
  const firstLen = parseInt(totalLen / 2)
  const lastLen = totalLen - firstLen
  const first = address.substr(0, firstLen)
  const last = address.substr(0 - lastLen)
  return address ? `${first}...${last}` : ''
}

// export const chatLink = address => `https://chat.web3nft.social/dm/${address}`
export const chatLink = (address) => {
  if (!address)
    return ''
  address = getAddressViem(address)
  return `https://chat.web3nft.social/dm/${address}`
  // return `https://chat.blockscan.com/index?a=${address}`
}

export const isSameAddress = (a, b) => {
  a = unref(a)
  b = unref(b)
  if (!a || !b)
    return false

  a = getAddressViem(a)
  b = getAddressViem(b)
  return a === b
}

export const isValidateAddress = (address) => {
  try {
    return getAddressViem(unref(address))
  }
  catch (e) {
    return false
  }
}

export function addressToBytes32(address: string) {
  // "0x" + 24 zeros + Rest of the address string with leading "0x" trimmed
  return (
    address.slice(0, 2) +
    '000000000000000000000000' +
    address.slice(2, address.length)
  )
}