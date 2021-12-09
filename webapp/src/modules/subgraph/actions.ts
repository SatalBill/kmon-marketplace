import { action } from 'typesafe-actions'

export const GET_BLOCK_NUMBER_REQUEST = '[Request] Get block number'
export const GET_BLOCK_NUMBER_SUCCESS = '[Success] Get block number'
export const GET_BLOCK_NUMBER_FAILURE = '[Failure] Get block number'

export const getBlockNumberRequest = () =>
  action(GET_BLOCK_NUMBER_REQUEST)
export const getBlockNumberSuccess = (blockNumber: number) =>
  action(GET_BLOCK_NUMBER_SUCCESS, { blockNumber })
export const getBlockNumberFailure = (error: string) =>
  action(GET_BLOCK_NUMBER_FAILURE, { error })

export type GetBlockNumberRequestAction = ReturnType<typeof getBlockNumberRequest>
export type GetBlockNumberSuccessAction = ReturnType<typeof getBlockNumberSuccess>
export type GetBlockNumberFailureAction = ReturnType<typeof getBlockNumberFailure>
