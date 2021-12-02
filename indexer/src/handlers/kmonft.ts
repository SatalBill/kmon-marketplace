import { BigInt, log } from "@graphprotocol/graph-ts"

import { cancelActiveOrder, clearNFTOrderProperties, getNFTId } from "../modules/nft"
import * as categories from '../modules/category/categories'
import * as addresses from '../data/addresses'
import { Birth, EggHatched, Transfer } from "../entities/KMONFT/KMONFT"
import { Kryptomon, KryptomonExtraData, KryptomonGenes, NFT } from "../entities/schema"
import { createAccount } from "../modules/wallet"
import { buildKryptomonFromNFT, ElementData, getKryptomonTokenURI, typeFormatted } from "../modules/kryptomon"
import { buildCountFromNFT } from "../modules/count"

export function handleBirth(event: Birth): void {
  let kryptomonId = event.params.kryptomonId.toString()

  let id = getNFTId(categories.KRYPTOMON, addresses.KMONFT, kryptomonId)

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
  genes.fire = paramsGenes[0]
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
  genes.generalTalent = paramsGenes[17]
  genes.sex = paramsGenes[18]
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
  genes.laziness = paramsGenes[31]
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

  // element type
  const typeDraft: BigInt[] = [];
  let elementBreakDown: ElementData[] = [];
  let c = 0;
  for (let i = 0; i < 8; i++) {
    let sum: BigInt = paramsGenes[c].times(paramsGenes[c + 1]);
    c = c + 2;
    typeDraft.push(sum);
    let data: ElementData;
    data.typeName = typeFormatted[i];
    data.valueName = typeDraft[i];
    elementBreakDown.push(data);
  }
  let totalSum: BigInt;
  for (let i = 0; i < elementBreakDown.length; i++) {
    totalSum = totalSum.plus(elementBreakDown[i].valueName);
  }

  for (let i = 0; i < elementBreakDown.length; i++) {
    elementBreakDown[i].percentage = elementBreakDown[i].valueName.times(BigInt.fromString("100")).div(totalSum)
  }

  let typeSelected = indexOfMax(typeDraft);
  kryptomon.elementType = typeFormatted[typeSelected.toI32()];
  kryptomon.elementTalent = typeDraft[typeSelected.toI32()];
  const percentage = kryptomon.elementTalent.times(BigInt.fromString("100")).div(totalSum);
  kryptomon.elementPercentage = percentage

  if (genes.attack.times(BigInt.fromString("10")).gt(genes.defense.times(BigInt.fromString("11")))) {
    kryptomon.speciality = "Attack";
  } else if (genes.defense.times(BigInt.fromString("10")).lt(genes.attack.times(BigInt.fromString("11")))) {
    kryptomon.speciality = "Defense";
  } else {
    kryptomon.speciality = "Balance";
  }

  kryptomon.save()
  let nft = new NFT(id)
  nft.name = kryptomonId
  nft.contractAddress = event.address
  nft.tokenId = event.params.kryptomonId
  nft.category = categories.KRYPTOMON
  nft.owner = event.params.owner.toHex()
  nft.kryptomon = kryptomon.id;
  nft.tokenURI = getKryptomonTokenURI(kryptomon);
  nft.searchText = ''
  nft.createdAt = event.block.timestamp
  nft.updatedAt = event.block.timestamp
  nft.searchKryptomonGenesGeneration = genes.generation
  nft.searchKryptomonStatus = kryptomon.status
  nft.searchKryptomonSpeciality = kryptomon.speciality
  nft.searchKryptomonElementPercentage = kryptomon.elementPercentage
  nft.searchKryptomonElementType = kryptomon.elementType
  nft.searchKryptomonElementTalent = kryptomon.elementTalent
  nft.searchKryptomonFire = genes.fire
  nft.searchKryptomonFireTalent = genes.fireTalent
  nft.searchKryptomonWater = genes.water
  nft.searchKryptomonWaterTalent = genes.waterTalent
  nft.searchKryptomonIce = genes.ice
  nft.searchKryptomonIceTalent = genes.iceTalent
  nft.searchKryptomonGround = genes.ground
  nft.searchKryptomonGroundTalent = genes.groundTalent
  nft.searchKryptomonAir = genes.air
  nft.searchKryptomonAirTalent = genes.airTalent
  nft.searchKryptomonElectro = genes.electro
  nft.searchKryptomonElectroTalent = genes.electroTalent
  nft.searchKryptomonGhost = genes.ghost
  nft.searchKryptomonGhostTalent = genes.ghostTalent
  nft.searchKryptomonGrass = genes.grass
  nft.searchKryptomonGrassTalent = genes.grassTalent
  nft.searchKryptomonColor = genes.color
  nft.searchKryptomonSex = genes.sex
  nft.searchKryptomonGeneralTalent = genes.generalTalent
  nft.searchKryptomonAttack = genes.attack
  nft.searchKryptomonDefense = genes.defense
  nft.searchKryptomonSpecial = genes.special
  nft.searchKryptomonXFactor = genes.xFactor
  nft.searchKryptomonGrowthTalentFactor = genes.growthTalentFactor
  nft.searchKryptomonConstitution = genes.constitution
  nft.searchKryptomonHealthPoints = genes.healthPoints
  nft.searchKryptomonSpeed = genes.speed
  nft.searchKryptomonAffections = genes.affections
  nft.searchKryptomonCrazyness = genes.crazyness
  nft.searchKryptomonInstinct = genes.instinct
  nft.searchKryptomonHunger = genes.hunger
  nft.searchKryptomonLaziness = genes.laziness
  nft.searchKryptomonBrave = genes.brave
  nft.searchKryptomonSmart = genes.smart
  nft.searchKryptomonBodySize = genes.bodySize
  nft.searchKryptomonEgo = genes.ego
  nft.searchKryptomonSkinType = genes.skinType

  nft.save()

  createAccount(event.params.owner)
}

export function handleHatching(event: EggHatched): void {
  let kryptomonId = event.params.kryptomonId.toString()
  let status: BigInt = BigInt.fromI32(1);
  let id = getNFTId(categories.KRYPTOMON, event.address.toHexString(), kryptomonId)

  let nft = NFT.load(id);
  nft.searchKryptomonStatus = status;
  nft.save();

  let kryptomon = Kryptomon.load(id);
  kryptomon.status = status;
  kryptomon.isHatched = true;
  kryptomon.save();
}

export function isMint(event: Transfer): boolean {
  return event.params.from.toHexString() == addresses.Null
}

export function handleTransfer(event: Transfer): void {
  if (event.params.tokenId.toString() == '') {
    return
  }

  let contractAddress = event.address.toHexString()
  let category = categories.KRYPTOMON;
  let id = getNFTId(
    category,
    event.address.toHexString(),
    event.params.tokenId.toString()
  )

  let nft = new NFT(id)

  nft.tokenId = event.params.tokenId
  nft.owner = event.params.to.toHex()
  nft.contractAddress = event.address
  nft.category = category
  nft.updatedAt = event.block.timestamp

  if (isMint(event)) {
    nft.createdAt = event.block.timestamp

    nft.searchText = ''

    let metric = buildCountFromNFT(nft)
    metric.save()
  } else {
    let oldNFT = NFT.load(id)
    if (cancelActiveOrder(oldNFT!, event.block.timestamp)) {
      nft = clearNFTOrderProperties(nft!)
    }
  }

  if (category == categories.KRYPTOMON) {
    if (isMint(event)) {

    } else {
      let kryptomon: Kryptomon = Kryptomon.load(id)!
      kryptomon.owner = nft.owner
      log.info("Transfer: owner-{}, tokenId-{}, speciality-{}", [kryptomon.owner, kryptomon.tokenId.toString(), kryptomon.speciality])
      kryptomon.save()
    }
  }

  createAccount(event.params.to)

  nft.save()
}

export function indexOfMax(arr: Array<BigInt>): BigInt {
  if (arr.length === 0) {
    return BigInt.fromString("0");
  }

  var max = arr[0];
  var maxIndex = BigInt.fromString("0");

  for (var i = 1; i < arr.length; i++) {
    if (arr[i].gt(max)) {
      maxIndex = BigInt.fromString(i.toString());
      max = arr[i];
    }
  }

  return maxIndex;
}

//export function handleTransfer(event: Transfer): void {}
