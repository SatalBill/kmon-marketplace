import React, { useEffect, useState } from 'react'
import { Close, Modal, Grid } from '@kmon/ui'

import { Props } from './BreedingModal.types'
import './BreedingModal.css'
import { NFTDetail } from './NFTDetail'
import { Fee } from './Fee'
import { Probability } from './Probability'

const BreedingModal = (props: Props) => {
  const { myNFT, selectedNFT, open, simulatedGenes, onClose, onSimulateBreeding } = props
  const [genes, setGenes] = useState<number[]>([])

  const classes = ["kryptomon", "breeding-modal"]

  const handleBreed = async () => {
    
  }

  const simulate = async () => {
    if (myNFT.genesV2 && selectedNFT.genesV2) {
      if (myNFT.genesV2.sex > 5 && selectedNFT.genesV2.sex <= 5) {
        onSimulateBreeding(myNFT.tokenId, selectedNFT.tokenId)
      } else if (myNFT.genesV2.sex <=5 && selectedNFT.genesV2.sex > 5) {
        onSimulateBreeding(selectedNFT.tokenId, myNFT.tokenId)
      }
    }
  }

  useEffect(() => {
    simulate()
  }, [myNFT, selectedNFT])

  useEffect(() => {
    if (simulatedGenes) {
      const [,,,,,,,,,,,,,,,,,,,,,,,,constitution,,,affections,crazyness,instinct,hunger,laziness,brave,smart,,,,] = simulatedGenes
      setGenes([constitution,affections,crazyness,instinct,hunger,laziness,brave,smart])
    }
  }, [simulatedGenes])

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
              <Fee myNFT={myNFT} selectedNFT={selectedNFT} onBreed={handleBreed} onCancel={() => onClose()} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Probability myNFT={myNFT} selectedNFT={selectedNFT} simulatedGenes={genes} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(BreedingModal)
