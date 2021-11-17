import { LootboxType } from "./types";

export function toStringLootboxType(boxType: LootboxType): string {
  let boxTypeStr: string = ''
  switch (boxType) {
    case LootboxType.Basic:
      boxTypeStr = 'basic'
      break
    case LootboxType.Medium:
      boxTypeStr = 'medium'
      break
    case LootboxType.Premium:
      boxTypeStr = 'premium'
      break
    default:
      break
  }
  return boxTypeStr
}
