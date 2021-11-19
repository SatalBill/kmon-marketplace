import { Section } from '../../../../modules/vendor/decentraland/routing/types'
import { MultipleFilters } from '../../NFTSidebar/NFTSidebar'

export type Props = {
  section?: Section
  onSectionClick: (section: Section) => void
  onMultiItemClick: (data: MultipleFilters) => void
  elemTypes?: string[]
  specialties?: string[]
  supers?: string[]
  affection?: string[]
  braveness?: string[]
  constitution?: string[]
  craziness?: string[]
  hunger?: string[]
  instinct?: string[]
  smart?: string[]
  elementStartingTalent?: string[]
  laziness?: string[]
  bodySize?: string[]
  ego?: string[]
  healthPoints?: string[]
  speed?: string[]
  sex?: string[]
  skinType?: string[]
}
