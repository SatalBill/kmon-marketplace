import React, { useEffect, useState } from 'react'
import { Close, Modal, Grid } from '@kmon/ui'

import { Props } from './BreedingModal.types'
import './BreedingModal.css'
import { NFTDetail } from './NFTDetail'
import { Fee } from './Fee'
import { Probability } from './Probability'
import { simulateBreeding } from '../../../modules/breed/utils'

const BreedingModal = (props: Props) => {
  const { myNFT, selectedNFT, open, onClose } = props
  const [simulatedGenes, setSimulatedGenes] = useState<number[]>([])

  const classes = ["kryptomon", "breeding-modal"]

  const handleBreed = async () => {
    
  }

  const simulate = async () => {
    let constitution,affections,crazyness,instinct,hunger,laziness,brave,smart
    if (myNFT.genesV2 && selectedNFT.genesV2) {
      if (myNFT.genesV2.sex > 5 && selectedNFT.genesV2.sex <= 5) {
        ;([,,,,,,,,,,,,,,,,,,,,,,,,constitution,,,affections,crazyness,instinct,hunger,laziness,brave,smart,,,,] = await simulateBreeding(myNFT.tokenId, selectedNFT.tokenId))
      } else if (myNFT.genesV2.sex <=5 && selectedNFT.genesV2.sex > 5) {
        ;([,,,,,,,,,,,,,,,,,,,,,,,,constitution,,,affections,crazyness,instinct,hunger,laziness,brave,smart,,,,] = await simulateBreeding(selectedNFT.tokenId, myNFT.tokenId))
      }
      if (constitution !== undefined && affections !== undefined && crazyness !== undefined && instinct !== undefined && hunger !== undefined && laziness !== undefined && brave !== undefined && smart !== undefined) {
        setSimulatedGenes([constitution,affections,crazyness,instinct,hunger,laziness,brave,smart])
      }
    }
  }

  useEffect(() => {
    simulate()
  }, [myNFT, selectedNFT])

  return (
    <Modal size="large" open={open} closeIcon={<Close onClick={() => onClose()} />} className={classes.join(' ')}>
      <Modal.Header>&nbsp;</Modal.Header>
      <Modal.Content>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column width={8}>
              <NFTDetail nft={myNFT} />
            </Grid.Column>
            <Grid.Column width={8}>
              <NFTDetail nft={selectedNFT} view="right" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Fee myNFT={myNFT} selectedNFT={selectedNFT} onBreed={handleBreed} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Probability myNFT={myNFT} selectedNFT={selectedNFT} simulatedGenes={simulatedGenes} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(BreedingModal)
