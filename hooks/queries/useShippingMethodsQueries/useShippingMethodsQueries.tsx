import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getShippingRates } from '@/lib/gql/queries'
import { shippingMethodKeys } from '@/lib/react-query/queryKeys'

import type { CrShippingRate } from '@/lib/gql/types'

export interface UseShippingMethodsResponse {
  data: CrShippingRate[]
  isLoading: boolean
  isSuccess: boolean
}

const loadShippingMethods = async (checkoutId: string) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: getShippingRates,
    variables: { checkoutId },
  })

  return response?.orderShipmentMethods
}

export const useShippingMethodsQueries = (
  checkoutId: string | null | undefined,
  isNewAddressAdded?: boolean,
  selectedShippingAddressId?: number
): UseShippingMethodsResponse => {
  const {
    data = [],
    isLoading,
    isSuccess,
  } = useQuery(
    shippingMethodKeys.detail(
      checkoutId as string,
      isNewAddressAdded?.toString(),
      selectedShippingAddressId
    ),
    () => loadShippingMethods(checkoutId as string),
    {
      cacheTime: 0,
      enabled: !!(checkoutId && (isNewAddressAdded?.toString() || selectedShippingAddressId)),
    }
  )

  return { data, isLoading, isSuccess }
}
