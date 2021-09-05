import React from 'react'
import { Container } from '@kmon/ui'
import { Row } from '../../Layout/Row'
import { Props } from './ProductDetail.types'
import './ProductDetail.css'
import { NFTDetailCard } from '../../NFTDetailCard'
import { Elements } from '../Elements'
import { TitleBlock } from '../TitleBlock'
import { DescriptionBlock } from '../DescriptionBlock'
import { Details } from '../Details'
import { DNAChart } from '../DNAChart'
import Ice from '../../../images/egg/elem-ice.svg'
import Air from '../../../images/egg/elem-air.svg'
import Electro from '../../../images/egg/elem-electro.svg'
import Ghost from '../../../images/egg/elem-ghost.svg'
import Grass from '../../../images/egg/elem-grass.svg'
import Ground from '../../../images/egg/elem-ground.svg'
import Water from '../../../images/egg/elem-water.svg'
import Fire from '../../../images/egg/elem-fire.svg'
import { Column } from '../../Layout/Column'

const WearableDetail = (props: Props) => {
  const { nft, onNavigate } = props
  const genes = nft.data.kryptomon?.genes

  const elementTypes = [
    {
      title: 'Water',
      value: genes?.water,
      icon: Water
    },
    {
      title: 'Grass',
      value: genes?.grass,
      icon: Grass
    },
    {
      title: 'Fire',
      value: genes?.fireGenes,
      icon: Fire
    },
    {
      title: 'Electro',
      value: genes?.electro,
      icon: Electro
    },
    {
      title: 'Ground',
      value: genes?.ground,
      icon: Ground
    },
    {
      title: 'Ghost',
      value: genes?.ghost,
      icon: Ghost
    },
    {
      title: 'Ice',
      value: genes?.ice,
      icon: Ice
    },
    {
      title: 'Air',
      value: genes?.air,
      icon: Air
    }
  ]

  const maxElementType = elementTypes.reduce((prev, current) => {
    return ((prev &&
      typeof prev.value === 'string' &&
      Number.parseInt(prev.value)) ||
      0) >
      ((current &&
        typeof current.value === 'string' &&
        Number.parseInt(current.value)) ||
        0)
      ? prev
      : current
  })

  return (
    <Container className="product-container">
      <Row>
        <NFTDetailCard maxElementType={maxElementType} nft={nft} />
        <Column>
          <Details nft={nft} />
          <TitleBlock title="DNA chart">
            <DNAChart nft={nft} />
          </TitleBlock>
        </Column>
      </Row>
      <TitleBlock title="Elements">
        <Elements
          elementTypes={elementTypes}
          maxElementType={maxElementType}
          nft={nft}
        />
      </TitleBlock>
      <TitleBlock title="Description">
        <DescriptionBlock nft={nft} />
      </TitleBlock>
    </Container>
  )
}

export default React.memo(WearableDetail)
