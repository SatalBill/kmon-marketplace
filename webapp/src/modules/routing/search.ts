import { Network, NFTCategory, WearableCategory } from '@kmon/schemas'
import { View } from '../ui/types'
import { VendorName } from '../vendor/types'
import { Section } from '../vendor/routing/types'
import { SearchOptions, SortBy } from './types'

export const SEARCH_ARRAY_PARAM_SEPARATOR = '_'

export function getDefaultOptionsByView(view?: View): SearchOptions {
  return {
    onlyOnSale: view !== View.ACCOUNT,
    sortBy: view === View.ACCOUNT ? SortBy.NEWEST : SortBy.RECENTLY_LISTED
  }
}

export function getSearchParams(options?: SearchOptions) {
  let params: URLSearchParams | undefined

  if (options) {
    params = new URLSearchParams()

    if (options.section) {
      params.set('section', options.section)
    }

    if (options.isMap !== undefined) {
      params.set('isMap', options.isMap.toString())
      // isFullscreen is only set if isMap is true
      if (options.isFullscreen !== undefined) {
        params.set('isFullscreen', options.isFullscreen.toString())
      }
    }

    if (options.vendor) {
      params.set('vendor', options.vendor)
    }
    if (options.page) {
      params.set('page', options.page.toString())
    }
    if (options.sortBy) {
      params.set('sortBy', options.sortBy)
    }
    if (options.onlyOnSale !== undefined) {
      params.set('onlyOnSale', options.onlyOnSale.toString())
    }
    if (options.wearableRarities && options.wearableRarities.length > 0) {
      params.set(
        'rarities',
        options.wearableRarities.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }

    if (options.contracts && options.contracts.length > 0) {
      params.set(
        'contracts',
        options.contracts.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }

    if (options.search) {
      params.set('search', options.search)
    }

    if (options.network && Object.values(Network).includes(options.network)) {
      params.set('network', options.network)
    }
    if (options.kryptomonStatus) {
      params.set('kryptomonStatus', options.kryptomonStatus.toString())
    }

    if (options.elemTypes && options.elemTypes.length > 0) {
      params.set(
        'elemTypes',
        options.elemTypes.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.specialties && options.specialties.length > 0) {
      params.set(
        'specialties',
        options.specialties.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.supers && options.supers.length > 0) {
      params.set('supers', options.supers.join(SEARCH_ARRAY_PARAM_SEPARATOR))
    }
    if (options.affection && options.affection.length > 0) {
      params.set(
        'affection',
        options.affection.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.laziness && options.laziness.length > 0) {
      params.set(
        'laziness',
        options.laziness.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.braveness && options.braveness.length > 0) {
      params.set(
        'braveness',
        options.braveness.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.constitution && options.constitution.length > 0) {
      params.set(
        'constitution',
        options.constitution.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.craziness && options.craziness.length > 0) {
      params.set(
        'craziness',
        options.craziness.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.hunger && options.hunger.length > 0) {
      params.set('hunger', options.hunger.join(SEARCH_ARRAY_PARAM_SEPARATOR))
    }
    if (options.instinct && options.instinct.length > 0) {
      params.set(
        'instinct',
        options.instinct.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
    if (options.smart && options.smart.length > 0) {
      params.set('smart', options.smart.join(SEARCH_ARRAY_PARAM_SEPARATOR))
    }
    if (
      options.elementStartingTalent &&
      options.elementStartingTalent.length > 0
    ) {
      params.set(
        'elementStartingTalent',
        options.elementStartingTalent.join(SEARCH_ARRAY_PARAM_SEPARATOR)
      )
    }
  }
  return params
}

export function getSearchCategory(section: Section) {
  // TODO: Move this to each vendor? Names shortened for brevity here
  const DclSection = Section[VendorName.DECENTRALAND]
  switch (section) {
    case DclSection.PARCELS:
      return 'parcel'
    case DclSection.ESTATES:
      return 'estate'
    case DclSection.WEARABLES:
    case DclSection.WEARABLES_HEAD:
    case DclSection.WEARABLES_EYEBROWS:
    case DclSection.WEARABLES_EYES:
    case DclSection.WEARABLES_FACIAL_HAIR:
    case DclSection.WEARABLES_HAIR:
    case DclSection.WEARABLES_MOUTH:
    case DclSection.WEARABLES_UPPER_BODY:
    case DclSection.WEARABLES_LOWER_BODY:
    case DclSection.WEARABLES_FEET:
    case DclSection.WEARABLES_ACCESORIES:
    case DclSection.WEARABLES_EARRING:
    case DclSection.WEARABLES_EYEWEAR:
    case DclSection.WEARABLES_HAT:
    case DclSection.WEARABLES_HELMET:
    case DclSection.WEARABLES_MASK:
    case DclSection.WEARABLES_TIARA:
    case DclSection.WEARABLES_TOP_HEAD:
      return 'wearable'
    case DclSection.ENS:
      return 'ens'
    default:
      return NFTCategory.KRYPTOMON
  }
}

export function getSearchWearableSection(category: WearableCategory) {
  const DclSection = Section[VendorName.DECENTRALAND]
  for (const section of Object.values(DclSection)) {
    const sectionCategory = getSearchWearableCategory(section)
    if (category === sectionCategory) {
      return section
    }
  }
}

export function getSearchWearableCategory(section: Section) {
  const DclSection = Section[VendorName.DECENTRALAND]
  switch (section) {
    case DclSection.WEARABLES_EYEBROWS:
      return WearableCategory.EYEBROWS
    case DclSection.WEARABLES_EYES:
      return WearableCategory.EYES
    case DclSection.WEARABLES_FACIAL_HAIR:
      return WearableCategory.FACIAL_HAIR
    case DclSection.WEARABLES_HAIR:
      return WearableCategory.HAIR
    case DclSection.WEARABLES_MOUTH:
      return WearableCategory.MOUTH
    case DclSection.WEARABLES_UPPER_BODY:
      return WearableCategory.UPPER_BODY
    case DclSection.WEARABLES_LOWER_BODY:
      return WearableCategory.LOWER_BODY
    case DclSection.WEARABLES_FEET:
      return WearableCategory.FEET
    case DclSection.WEARABLES_EARRING:
      return WearableCategory.EARRING
    case DclSection.WEARABLES_EYEWEAR:
      return WearableCategory.EYEWEAR
    case DclSection.WEARABLES_HAT:
      return WearableCategory.HAT
    case DclSection.WEARABLES_HELMET:
      return WearableCategory.HELMET
    case DclSection.WEARABLES_MASK:
      return WearableCategory.MASK
    case DclSection.WEARABLES_TIARA:
      return WearableCategory.TIARA
    case DclSection.WEARABLES_TOP_HEAD:
      return WearableCategory.TOP_HEAD
  }
}

export function getURLParamArray<T extends string>(
  search: string,
  paramName: string,
  validValues: string[] = []
) {
  const param = getURLParam<T>(search, paramName)
  if (param === null) {
    return []
  } else if (validValues && validValues.length > 0) {
    return param
      .split(SEARCH_ARRAY_PARAM_SEPARATOR)
      .filter(item => validValues.includes(item as T)) as T[]
  } else {
    return param
      .split(SEARCH_ARRAY_PARAM_SEPARATOR)
      .filter(item => item as T) as T[]
  }
}

export function getURLParam<T extends string>(
  search: string,
  paramName: string
) {
  const param = new URLSearchParams(search).get(paramName) as T | null
  return param
}
