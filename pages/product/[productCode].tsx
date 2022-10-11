import { useEffect, useState } from 'react'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getConfig from 'next/config'
import { useRouter } from 'next/router'

import nextI18NextConfig from '../../next-i18next.config'
import CmsComponent from '@/components/home/CmsComponent/CmsComponent'
import { ProductDetailTemplate } from '@/components/page-templates'
import { ProductRecommendations } from '@/components/product'
import getCategoryTree from '@/lib/api/operations/get-category-tree'
import getProduct from '@/lib/api/operations/get-product'
import search from '@/lib/api/operations/get-product-search'
import { onEntryChange } from '@/lib/cms/content-stack'
import { productGetters } from '@/lib/getters'
import { getPage } from '@/lib/operations/get-page'
import type { CategorySearchParams, CategoryTreeResponse } from '@/lib/types'

import type { NextPage, GetStaticPropsContext } from 'next'

const getCmsProductPageData = async (productCode: string) => {
  const cmsPage = await getPage({
    contentTypeUid: 'product_detail',
    referenceFieldPath: [],
    entryUrl: productCode,
  })
  return cmsPage
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params, locale } = context
  const { productCode } = params as any
  const { serverRuntimeConfig } = getConfig()

  const cmsProductDetail = await getCmsProductPageData(productCode)
  const product = await getProduct(productCode)
  const categoriesTree: CategoryTreeResponse = await getCategoryTree()

  const page = await builder
    .get('page', {
      userAttributes: {
        urlPath: `/product/productdetails`,
      },
    })
    .toPromise()

  return {
    props: {
      productCode,
      product,
      categoriesTree,
      cmsProductDetail,
      ...(await serverSideTranslations(locale as string, ['common'], nextI18NextConfig)),
    },
    revalidate: serverRuntimeConfig.revalidate,
  }
}

export async function getStaticPaths() {
  const { serverRuntimeConfig } = getConfig()
  const searchResponse = await search({
    pageSize: serverRuntimeConfig.pageSize,
  } as CategorySearchParams)
  const { items } = searchResponse?.data?.products

  const paths: string[] = []
  items?.length &&
    items?.map((item: { productCode: string }) => paths.push(`/product/${item.productCode}`))

  return { paths, fallback: true }
}

const ProductDetailPage: NextPage = (props: any) => {
  const { productCode, product, cmsProductDetail } = props
  const { isFallback } = useRouter()
  const [cmsProductDetailRespone, setCmsProductDetailPageResponse] = useState(cmsProductDetail)

  const fetchData = async () => {
    try {
      const cmsPage = await getCmsProductPageData(productCode)
      setCmsProductDetailPageResponse(cmsPage)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    onEntryChange(() => {
      fetchData()
    })
  }, [])

  if (isFallback) {
    return <>Fallback</>
  }

  const breadcrumbs = product ? productGetters.getBreadcrumbs(product) : []
  return (
    <>
      <ProductDetailTemplate
        product={product}
        breadcrumbs={breadcrumbs}
        cmsProducts={cmsProductDetailRespone}
      />
    </>
  )
}

export default ProductDetailPage
