import { ChainId, Network } from '@kmon/schemas'
import { getContract, ContractName as CN } from '@kmon/transactions'
import {
  Contract,
  ContractService as ContractServiceInterface
} from '../services'
import { Network as AppNetwork } from '../../contract/types'
import { TransferType } from '../types'
import { nftAPI } from './nft'

const network = process.env.REACT_APP_NETWORK! as AppNetwork

export enum ContractName {
  MANA = 'MANA',
  MARKETPLACE = 'Marketplace',
  BIDS = 'Bids'
}

export class ContractService implements ContractServiceInterface {
  contracts = []

  hasFetched = false

  async build() {
    if (this.hasFetched) {
      return
    }
    this.hasFetched = true
  }

  getContracts() {
    return this.contracts
  }

  getTransferType(_address: string) {
    return TransferType.SAFE_TRANSFER_FROM
  }
}
