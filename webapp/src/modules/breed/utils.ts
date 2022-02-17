import { ethers, providers } from 'ethers'
import { getContract, ContractName as CN } from '@kmon/transactions'
import { Wallet } from '@kmon/dapps/dist/modules/wallet/types'
import { getConnectedProvider, getConnectedProviderChainId } from '@kmon/dapps/dist/lib/eth'

export async function addToBreedingCentre(wallet: Wallet | null, tokenId: string, price: string) {
  const connectedProvider = await getConnectedProvider()
  if (!wallet || !connectedProvider) {
    throw new Error('Invalid address. Wallet must be connected.')
  }

  const kmonftV2Factory = getContract(CN.KMONFTV2, Number(getConnectedProviderChainId()))
  const signer = await new providers.Web3Provider(connectedProvider).getSigner()

  const kmonftV2 = new ethers.Contract(kmonftV2Factory.address, kmonftV2Factory.abi, signer)
  return kmonftV2.addToBreedingCentre(tokenId, price)
}
