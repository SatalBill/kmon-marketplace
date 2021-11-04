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

export function getSendTransactionConfirmedToast(chainId: ChainId, txHash: string, boxType: string) {
  return {
    type: ToastType.INFO,
    title: t('toast.send_transaction_confirmed.title'),
    body: (
      <T
        id="toast.send_transaction_confirmed.body"
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
