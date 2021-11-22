import { NFTsFetchParams } from '../../../nft/types'
import { NFTsFetchFilters, NFTResponse } from './types'
import { Contract } from '../../services'
import { contracts } from '../../../contract/utils'
import { VendorName } from '../../types'
import {
  GENERATION_TO_REQ,
  SEX_TO_REQ,
  SKIN_TYPE_TO_REQ
} from '../../decentraland/nft/utils'

export const NFT_SERVER_URL = process.env.REACT_APP_NFT_SERVER_URL!

class NFTAPI {
  fetch = async (params: NFTsFetchParams, filters?: NFTsFetchFilters) => {
    const queryParams = this.buildQueryString(params, filters)
    const response: NFTResponse = await fetch(
      `${NFT_SERVER_URL}/v1/nfts?${queryParams}`
    ).then(resp => resp.json())

    return response
  }

  async fetchOne(contractAddress: string, tokenId: string) {
    const response: NFTResponse = await fetch(
      `${NFT_SERVER_URL}/v1/nfts?contractAddress=${contractAddress}&tokenId=${tokenId}`
    ).then(resp => resp.json())
    if (response.data.length === 0) {
      throw new Error('Not found')
    }
    return response.data[0]
  }

  async fetchContracts() {
    try {
      const response: {
        data: Omit<Contract, 'vendor'>[]
        total: number
      } = await fetch(
        `${NFT_SERVER_URL}/v1/contracts?first=0` // first=0 so it returns all the results
      ).then(resp => resp.json())
      const contracts: Contract[] = response.data.map(
        contractWithoutVendor => ({
          ...contractWithoutVendor,
          vendor: VendorName.KRYPTOMON
        })
      )
      return contracts
    } catch (error) {
      return []
    }
  }

  private buildQueryString(
    params: NFTsFetchParams,
    filters?: NFTsFetchFilters
  ): string {
    const queryParams = new URLSearchParams()

    queryParams.append('first', params.first.toString())
    queryParams.append('skip', params.skip.toString())
    // if (params.orderBy) {
    //   queryParams.append('sortBy', getSortBy(params.orderBy))
    // }
    if (params.category) {
      queryParams.append('category', params.category)
    }
    if (params.address) {
      queryParams.append('owner', params.address)
    }

    if (params.onlyOnSale) {
      queryParams.append('isOnSale', `${params.onlyOnSale}`)
    }
    if (params.search) {
      queryParams.set('search', params.search)
    }
    if (params.section) {
      if (GENERATION_TO_REQ[params.section]) {
        queryParams.set('generation', GENERATION_TO_REQ[params.section])
      }
      queryParams.set('section', params.section)
    }
    if (params.kryptomonStatus) {
      queryParams.set('kryptomonStatus', params.kryptomonStatus)
    }
    if (params.elemTypes) {
      queryParams.set('elemTypes', params.elemTypes)
    }
    if (params.specialties) {
      queryParams.set('specialties', params.specialties)
    }
    if (params.supers) {
      queryParams.set('supers', params.supers)
    }
    if (params.affection) {
      queryParams.set('affection', params.affection)
    }
    if (params.braveness) {
      queryParams.set('braveness', params.braveness)
    }
    if (params.constitution) {
      queryParams.set('constitution', params.constitution)
    }
    if (params.craziness) {
      queryParams.set('craziness', params.craziness)
    }
    if (params.hunger) {
      queryParams.set('hunger', params.hunger)
    }
    if (params.instinct) {
      queryParams.set('instinct', params.instinct)
    }
    if (params.smart) {
      queryParams.set('smart', params.smart)
    }
    if (params.elementStartingTalent) {
      queryParams.set('elementStartingTalent', params.elementStartingTalent)
    }
    if (params.laziness) {
      queryParams.set('laziness', params.laziness)
    }
    if (params.sex) {
      queryParams.set('sex', params.sex)
    }
    if (params.skinType) {
      queryParams.set('skinType', params.skinType)
    }
    if (params.bodySize) {
      queryParams.set('bodySize', params.bodySize)
    }
    if (params.ego) {
      queryParams.set('ego', params.ego)
    }
    if (params.healthPoints) {
      queryParams.set('healthPoints', params.healthPoints)
    }
    if (params.speed) {
      queryParams.set('speed', params.speed)
    }

    if (params.skinType) {
      const formatedSkinTypes = params.skinType
        .split('_')
        .map(elem => SKIN_TYPE_TO_REQ[elem])
      queryParams.set('skinType', formatedSkinTypes.join('_'))
    }
    if (params.sex) {
      if (SEX_TO_REQ[params.sex]) {
        queryParams.set('sex', SEX_TO_REQ[params.sex])
      }
    }
    if (filters) {
      if (filters.isLand) {
        queryParams.append('isLand', 'true')
      }
      if (filters.isWearableHead) {
        queryParams.append('isWearableHead', 'true')
      }
      if (filters.isWearableAccessory) {
        queryParams.append('isWearableAccessory', 'true')
      }
      if (filters.wearableCategory) {
        queryParams.append('wearableCategory', filters.wearableCategory)
      }
      if (filters.wearableRarities) {
        for (const wearableRarity of filters.wearableRarities) {
          queryParams.append('wearableRarity', wearableRarity)
        }
      }
      if (filters.contracts) {
        for (const address of filters.contracts) {
          if (contracts.some(contract => contract.address === address)) {
            queryParams.append('contractAddress', address)
          }
        }
      }
      if (filters.network) {
        queryParams.append('network', filters.network)
      }
    }

    return queryParams.toString()
  }
}

export const nftAPI = new NFTAPI()
