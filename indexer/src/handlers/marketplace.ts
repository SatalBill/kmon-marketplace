import { log } from '@graphprotocol/graph-ts'
import {
  OrderCreated,
  OrderSuccessful,
  OrderCancelled
} from '../entities/Marketplace/Marketplace'
import { Order, NFT } from '../entities/schema'
import {
  getNFTId,
  updateNFTOrderProperties,
  cancelActiveOrder
} from '../modules/nft'
import { getCategory } from '../modules/category'
import { buildCountFromOrder } from '../modules/count'
import * as status from '../modules/order/status'

export function handleOrderCreated(event: OrderCreated): void {
  log.warning('handleOrderCreated', []);
  log.warning('nftAddress: ' + event.params.nftAddress.toHexString(), [])
  let category = getCategory(event.params.nftAddress.toHexString())
  log.warning('Category: ' + category, []);
  let nftId = getNFTId(
    category,
    event.params.nftAddress.toHexString(),
    event.params.assetId.toString()
  )

  log.warning('nftId: ' + nftId, []);
  let nft = NFT.load(nftId)
  if (nft != null) {
    log.warning('nft found', []);
    let orderId = event.params.id.toHex()

    let order = new Order(orderId)
    order.status = status.OPEN
    order.category = category
    order.nft = nftId
    order.nftAddress = event.params.nftAddress
    order.tokenId = event.params.assetId
    order.txHash = event.transaction.hash
    order.owner = event.params.seller
    order.price = event.params.priceInWei
    order.expiresAt = event.params.expiresAt
    order.blockNumber = event.block.number
    order.createdAt = event.block.timestamp
    order.updatedAt = event.block.timestamp

    order.save()

    cancelActiveOrder(nft!, event.block.timestamp)

    nft.updatedAt = event.block.timestamp
    nft = updateNFTOrderProperties(nft!, order)
    nft.save()

    let count = buildCountFromOrder(order)
    count.save()
  }
  else {
    log.warning('NFT not found', []);
  }
}

export function handleOrderSuccessful(event: OrderSuccessful): void {
  let category = getCategory(event.params.nftAddress.toHexString())
  let nftId = getNFTId(
    category,
    event.params.nftAddress.toHexString(),
    event.params.assetId.toString()
  )
  let orderId = event.params.id.toHex()

  let nft = NFT.load(nftId)
  let order = Order.load(orderId)

  if (nft != null && order != null) {
    order.category = category
    order.status = status.SOLD
    order.buyer = event.params.buyer
    order.price = event.params.totalPrice
    order.blockNumber = event.block.number
    order.updatedAt = event.block.timestamp
    order.save()

    nft.owner = event.params.buyer.toHex()
    nft.updatedAt = event.block.timestamp
    nft = updateNFTOrderProperties(nft!, order!)
    nft.save()
  }
}

export function handleOrderCancelled(event: OrderCancelled): void {
  let category = getCategory(event.params.nftAddress.toHexString())
  let nftId = getNFTId(
    category,
    event.params.nftAddress.toHexString(),
    event.params.assetId.toString()
  )
  let orderId = event.params.id.toHex()

  let nft = NFT.load(nftId)
  let order = Order.load(orderId)

  if (nft != null && order != null) {
    order.category = category
    order.status = status.CANCELLED
    order.blockNumber = event.block.number
    order.updatedAt = event.block.timestamp
    order.save()

    nft.updatedAt = event.block.timestamp
    nft = updateNFTOrderProperties(nft!, order!)
    nft.save()
  }
}
