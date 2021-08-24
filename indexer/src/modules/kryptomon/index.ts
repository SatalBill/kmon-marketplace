import { NFT, Kryptomon } from '../../entities/schema'

export function buildKryptomonFromNFT(nft: NFT): Kryptomon {
  let kryptomon = new Kryptomon(nft.id)

  kryptomon.tokenId = nft.tokenId
  kryptomon.owner = nft.owner
  kryptomon.isHatched = false;

  return kryptomon
}

export function getKryptomonImage(kryptomon: Kryptomon): string {
  return (
    'https://api.kryptomon.co/json/kryptomon/meta/' +
    kryptomon.tokenId.toString()
  )
}

export function getKryptomonTokenURI(kryptomon: Kryptomon): string {
  return (
    'https://api.kryptomon.co/json/kryptomon/meta/' +
    kryptomon.tokenId.toString()
  )
}
