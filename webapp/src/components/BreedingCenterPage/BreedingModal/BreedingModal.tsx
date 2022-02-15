import React from 'react'
import { Close, Modal, Grid } from '@kmon/ui'

import { Props } from './BreedingModal.types'
import './BreedingModal.css'
import { NFTDetail } from './NFTDetail'
import { Fee } from './Fee'
import { Probability } from './Probability'

const BreedingModal = (props: Props) => {
  const { myNFT, selectedNFT, open, onClose } = props

  const classes = ["kryptomon", "breeding-modal"]

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
              <Fee myNFT={myNFT} selectedNFT={selectedNFT} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Probability myNFT={myNFT} selectedNFT={selectedNFT} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(BreedingModal)
