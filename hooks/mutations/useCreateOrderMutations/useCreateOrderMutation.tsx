import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createOrderMutation } from '@/lib/gql/mutations'
import { buildCreateOrderParams } from '@/lib/helpers'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { CrOrder, OrderActionInput } from '@/lib/gql/types'

export interface OrderInfo {
  orderId: string
  orderActionInput: OrderActionInput
}

const createOrder = async (checkout: CrOrder) => {
  const orderInfo: OrderInfo = buildCreateOrderParams(checkout)

  const client = makeGraphQLClient()

  const response = await client.request({
    document: createOrderMutation,
    variables: orderInfo,
  })

  return response?.createOrderAction
}

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(createOrder, {
    onSuccess: () => {
      queryClient.removeQueries([checkoutKeys.all])
    },
  })
}
