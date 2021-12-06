import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client';
import { getConnectedProvider } from '@kmon/dapps/dist/lib/eth'
import { Eth } from 'web3x-es/eth'
import { Popup } from '@kmon/ui'
import { t } from '@kmon/dapps/dist/modules/translation/utils'

const getSubgraphBlockQuery = gql`
  {
    _meta {
      block {
        number
      }
    }
  }
`

const convertTime = (secondsData: number): string => {                    
  const hours   = Math.floor(secondsData / 3600)
  const minutes = Math.floor((secondsData - (hours * 3600)) / 60)
  const seconds = secondsData - (hours * 3600) - (minutes * 60)
  if ( !!hours ) {
    if ( !!minutes ) {
      return `${hours}h ${minutes}m ${seconds}s`
    } else {
      return `${hours}h ${seconds}s`
    }
  }
  if ( !!minutes ) {
    return `${minutes}m ${seconds}s`
  }
  return `${seconds}s`
}

const IndexingDelay = () => {
  const [indexingDelay, setIndexingDelay] = useState<string | null>(null)
  const { data: subgraphBlock, refetch: fetchSubgraphBlock } = useQuery(getSubgraphBlockQuery)

  useEffect(() => {
    let interval: any
    if (subgraphBlock && subgraphBlock._meta.block.number) {
      const subgraphBlockNumber = subgraphBlock._meta.block.number
      getIndexingDelay(subgraphBlockNumber)
      interval = setInterval(() => {
        fetchSubgraphBlock()
      }, 30000) 
    }
    return () => clearInterval(interval)
  }, [subgraphBlock])

  const getIndexingDelay = async (subgraphBlockNumber: number) => {
    const provider = await getConnectedProvider()
    if (!provider) {
      console.warn('Could not connect to network')
      return
    }

    const eth = new Eth(provider)
    const subgraphTimestamp = (await eth.getBlock(subgraphBlockNumber)).timestamp
    const currentBlockNumber = await eth.getBlockNumber()
    const currentTimestamp = (await eth.getBlock(currentBlockNumber)).timestamp
    const delay = currentTimestamp - subgraphTimestamp
    if (delay > 60) {
      setIndexingDelay(convertTime(delay))
    } else {
      setIndexingDelay(null)
    }
  }

  return (
    <>
      {indexingDelay && (
          <Popup
            content={t('navigation.indexing_delay.tooltip')}
            position="top center"
            trigger={<span>{t('navigation.indexing_delay.title')}: {indexingDelay}</span>}
            on="hover"
          />
        )}
    </>
  )
}

export default React.memo(IndexingDelay)
