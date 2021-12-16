import { ItemVersion } from "../../../modules/item/constants";

export type Props = {
  isTxPending: boolean
  onBuy: (itemVersion: ItemVersion) => void
}
