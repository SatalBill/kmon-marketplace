import React, { useEffect, useState } from 'react'
import { Close, Modal, Grid } from '@kmon/ui'

import { Props } from './BreedingModal.types'
import './BreedingModal.css'
import { NFTDetail } from './NFTDetail'
import { Fee } from './Fee'
import { Probability } from './Probability'

const BreedingModal = (props: Props) => {
  const { myNFT, selectedNFT, myBreedingOrder, selectedBreedingOrder, open, simulatedGenes, isBreeding, onClose, onSimulateBreeding, onBreed } = props
  const [genes, setGenes] = useState<number[]>([])
  const [femaleTokenId, setFemaleTokenId] = useState<string | null>(null)
  const [maleTokenId, setMaleTokenId] = useState<string | null>(null)

  const classes = ["kryptomon", "breeding-modal"]

  const handleBreed = async () => {
    if (femaleTokenId && maleTokenId) {
      onBreed(femaleTokenId, maleTokenId)
    }
  }

  const simulate = async () => {
    if (myNFT && selectedNFT && myNFT.data.kryptomon?.genes && selectedNFT.data.kryptomon?.genes) {
      if (myNFT.data.kryptomon?.genes.sex > 5 && selectedNFT.data.kryptomon?.genes.sex <= 5) {
        onSimulateBreeding(myNFT.tokenId, selectedNFT.tokenId)
        setFemaleTokenId(myNFT.tokenId)
        setMaleTokenId(selectedNFT.tokenId)
      } else if (myNFT.data.kryptomon?.genes.sex <=5 && selectedNFT.data.kryptomon?.genes.sex > 5) {
        onSimulateBreeding(selectedNFT.tokenId, myNFT.tokenId)
        setFemaleTokenId(selectedNFT.tokenId)
        setMaleTokenId(myNFT.tokenId)
      }
    }
  }

  useEffect(() => {
    if (myNFT && selectedNFT) {
      simulate()
    }
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
              {myNFT && myBreedingOrder && <NFTDetail nft={myNFT} breedingOrder={myBreedingOrder} />}
            </Grid.Column>
            <Grid.Column width={8}>
              {selectedNFT && selectedBreedingOrder && <NFTDetail nft={selectedNFT} view="right" breedingOrder={selectedBreedingOrder} />}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              {myNFT && selectedNFT && <Fee myNFT={myNFT} selectedNFT={selectedNFT} onBreed={handleBreed} onCancel={() => onClose()} isBreeding={isBreeding} />}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              {myNFT && selectedNFT && <Probability myNFT={myNFT} selectedNFT={selectedNFT} simulatedGenes={genes} />}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(BreedingModal)
