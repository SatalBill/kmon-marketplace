import { BigInt, log } from "@graphprotocol/graph-ts"

import { getNFTId } from "../modules/nft"
import * as categories from '../modules/category/categories'
import * as addresses from '../data/addresses'
import { Birth, EggHatched } from "../entities/KMONFT/KMONFT"
import { Kryptomon, KryptomonExtraData, KryptomonGenes, NFT } from "../entities/schema"
import { createAccount } from "../modules/wallet"
import { getKryptomonTokenURI } from "../modules/kryptomon"

export function handleBirth(event: Birth): void {
  log.warning('handleBirth', [])
  let kryptomonId = event.params.kryptomonId.toString()

  let id = getNFTId(categories.KRYPTOMON, addresses.KMONFT, kryptomonId)

  log.warning('id: ' + id, [])

  let kryptomon = new Kryptomon(id)

  kryptomon.tokenId = event.params.kryptomonId
  kryptomon.owner = event.params.owner.toHex()
  kryptomon.isHatched = false;
  kryptomon.matronId = event.params.matronId;
  kryptomon.sireId = event.params.sireId;
  kryptomon.status = event.params.status;
  kryptomon.timeBorn = event.params.timeBorn;

  // Genes
  let genes = new KryptomonGenes(id)
  let paramsGenes = event.params.genes
  genes.fireGenes = paramsGenes[0]
  genes.fireTalent = paramsGenes[1]
  genes.water = paramsGenes[2]
  genes.waterTalent = paramsGenes[3]
  genes.ice = paramsGenes[4]
  genes.iceTalent = paramsGenes[5]
  genes.ground = paramsGenes[6]
  genes.groundTalent = paramsGenes[7]
  genes.air = paramsGenes[8]
  genes.airTalent = paramsGenes[9]
  genes.electro = paramsGenes[10]
  genes.electroTalent = paramsGenes[11]
  genes.ghost = paramsGenes[12]
  genes.ghostTalent = paramsGenes[13]
  genes.grass = paramsGenes[14]
  genes.grassTalent = paramsGenes[15]
  genes.color = paramsGenes[16]
  genes.sex = paramsGenes[17]
  genes.generalTalent = paramsGenes[18]
  genes.attack = paramsGenes[19]
  genes.defense = paramsGenes[20]
  genes.special = paramsGenes[21]
  genes.xFactor = paramsGenes[22]
  genes.growthTalentFactor = paramsGenes[23]
  genes.constitution = paramsGenes[24]
  genes.healthPoints = paramsGenes[25]
  genes.speed = paramsGenes[26]
  genes.affections = paramsGenes[27]
  genes.crazyness = paramsGenes[28]
  genes.instinct = paramsGenes[29]
  genes.hunger = paramsGenes[30]
  genes.lazyness = paramsGenes[31]
  genes.brave = paramsGenes[32]
  genes.smart = paramsGenes[33]
  genes.bodySize = paramsGenes[34]
  genes.ego = paramsGenes[35]
  genes.skinType = paramsGenes[36]
  genes.generation = paramsGenes[37]

  kryptomon.genes = id;

  genes.save();

  // extra data
  let extraData = new KryptomonExtraData(id);
  let paramsExtraData = event.params.extra_data;
  extraData.unfreezable = paramsExtraData[0];

  kryptomon.extraData = id;

  extraData.save()

  // let estateData = buildData(id, data, DataType.ESTATE)
  // if (estateData != null) {
  //   estate.data = id
  //   estateData.save()

  //   let nft = new NFT(id)
  //   nft.name = estateData.name
  //   nft.searchText = toLowerCase(estateData.name)
  //   nft.createdAt = event.block.timestamp
  //   nft.updatedAt = event.block.timestamp
  //   nft.save()
  // }

  kryptomon.save()
  log.warning('kryptomon saved', [])

  log.warning('saving nft', [])
  let nft = new NFT(id)
  nft.name = kryptomonId
  nft.contractAddress = event.address
  nft.tokenId = event.params.kryptomonId
  nft.category = categories.KRYPTOMON
  nft.owner = event.params.owner.toHex()
  nft.tokenURI = getKryptomonTokenURI(kryptomon);
  nft.kryptomon = kryptomon.id;
  nft.searchText = ''
  nft.createdAt = event.block.timestamp
  nft.updatedAt = event.block.timestamp
  nft.searchKryptomonGenesGeneration = genes.generation
  nft.searchKryptomonStatus = kryptomon.status
  nft.save()

  log.warning('nft saved', [])

  createAccount(event.params.owner)
  log.warning('createAccount saved', [])
}

export function handleHatching(event: EggHatched): void {
  let kryptomonId = event.params.kryptomonId.toString()
  let status: BigInt = new BigInt(1);

  let id = getNFTId(categories.KRYPTOMON, addresses.KMONFT, kryptomonId)
  let nft = NFT.load(id);
  nft.searchKryptomonStatus = status;
  nft.save();

  let kryptomon = Kryptomon.load(id);
  kryptomon.status = status;
  kryptomon.save();
}

//export function handleTransfer(event: Transfer): void {}
