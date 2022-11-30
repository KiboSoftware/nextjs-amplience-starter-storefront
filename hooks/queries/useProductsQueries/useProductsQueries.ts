import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { searchProductsQuery } from '@/lib/gql/queries'
import { buildProductSearchParams } from '@/lib/helpers'
import { productSearchResultKeys } from '@/lib/react-query/queryKeys'
import type { CategorySearchParams } from '@/lib/types'

import type { ProductSearchResult } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface UseProductsResponse {
  data: ProductSearchResult
  isLoading: boolean
  isSuccess: boolean
  isFetching: boolean
}

const fetchProductSearch = async (searchParams: CategorySearchParams) => {
  const productSearchInput = buildProductSearchParams(searchParams)
  const client = makeGraphQLClient()
  const response = await client.request({
    document: searchProductsQuery,
    variables: productSearchInput,
  })
  return response.products
}

/**
 * [Query hook] useProductsQueries uses the graphQL query
 *
 * <b>ProductSearch(query: String, startIndex: Int, filter: String, pageSize: Int, sortBy: String, facet: String, facetHierValue: String, facetTemplate: String, facetValueFilter: String): ProductSearchResult</b>
 *
 * Description : Fetches the product details based on filter and pagesize, here filter contains product codes.
 *
 * Parameters passed to function fetchProductSearch(searchParams: CategorySearchParams) => expects filter as productCode and page size to get the products.
 *
 * On success, returns the product list with 'refetchOnWindowFocus' set to false for this react query
 *
 * @param productCodes Accepts a Array<string> value
 *
 * @returns 'response?.products', which is list of products.
 */

export const useProductsQueries = (productCodes: Array<string>): UseProductsResponse => {
  const productCodeFilter: Array<string> = []
  productCodes?.forEach((code) => {
    productCodeFilter.push(`productCode eq ${code}`)
  })
  const searchParams = buildProductSearchParams({
    filter: productCodeFilter.join(' or '),
    pageSize: productCodes?.length,
  }) as CategorySearchParams
  const { data, isLoading, isSuccess, isFetching } = useQuery(
    productSearchResultKeys.searchParams(searchParams),
    () => fetchProductSearch(searchParams),
    {
      enabled: !!searchParams.filter,
    }
  )

  return { data, isLoading, isSuccess, isFetching }
}
