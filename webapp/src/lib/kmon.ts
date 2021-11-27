import { fromWei } from 'web3x-es/utils'

export function formatKMON(value: string) {
  return Number(fromWei(value, 'ether')).toLocaleString()
}

export function toKMON(num: number) {
  return num > 0 ? num.toString() : ''
}

export function fromKMON(kmon: string) {
  const num = kmon.split(/[,|.]/).join('')

  const result = parseInt(num, 10)

  if (isNaN(result) || result < 0) {
    return 0
  }

  return result
}

export function fromBNB(bnb: string) {
  const result = Number(bnb)

  if (isNaN(result) || result < 0) {
    return 0
  }

  return bnb
}
