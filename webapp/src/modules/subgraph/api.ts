import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { BlockNumberType } from './types';

const API_URL = process.env.REACT_APP_SUBGRAPH_URL as string

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache'
    }
  }
})

class SubgraphAPI {
  getBlockNumber = async () => {
    const query = gql`
      {
        _meta {
          block {
            number
          }
        }
      }
    `

    return client.query<BlockNumberType>({
      query,
    })
  }
}

export const subgraphAPI = new SubgraphAPI()
