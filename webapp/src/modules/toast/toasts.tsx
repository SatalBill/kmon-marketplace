import { ToastType } from '@kmon/ui'
import { T, t } from '@kmon/dapps/dist/modules/translation/utils'
import { getTransactionOrigin } from '@kmon/dapps/dist/modules/transaction/utils'
import { ChainId } from '@kmon/schemas'

const DISCORD_URL = process.env.REACT_APP_DISCORD_URL

export function getMetaTransactionFailureToast() {
  return {
    type: ToastType.ERROR,
    title: t('toast.meta_transaction_failure.title'),
    body: (
      <T
        id="toast.meta_transaction_failure.body"
        values={{
          br: <br />,
          discord_link: (
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
              Discord
            </a>
          )
        }}
      />
    ),
    timeout: 6000,
    closable: true
  }
}

export function getBuyLootboxApprovalToast(chainId: ChainId, txHash: string) {
  return {
    type: ToastType.INFO,
    title: t('toast.buy_lootbox_approval_confirmation.title'),
    body: (
      <T
        id="toast.buy_lootbox_approval_confirmation.body"
        values={{
          etherscan_link: (
            <a href={`${getTransactionOrigin(chainId)}/tx/${txHash}`} target="_blank" rel="noopener noreferrer">
              etherscan
            </a>
          )
        }}
      />
    ),
    timeout: 6000,
    closable: true
  }
}

export function getBuyLootboxTransferToast(chainId: ChainId, txHash: string, boxType: string) {
  return {
    type: ToastType.INFO,
    title: t('toast.buy_lootbox_transfer_confirmation.title'),
    body: (
      <T
        id="toast.buy_lootbox_transfer_confirmation.body"
        values={{
          box_type: boxType,
          etherscan_link: (
            <a href={`${getTransactionOrigin(chainId)}/tx/${txHash}`} target="_blank" rel="noopener noreferrer">
              etherscan
            </a>
          )
        }}
      />
    ),
    timeout: 6000,
    closable: true
  }
}
