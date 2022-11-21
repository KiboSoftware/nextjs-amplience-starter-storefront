import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import nextI18NextConfig from '../../../next-i18next.config'
import { CmsComponent } from '@/cms/components'
import { amplienceGetters } from '@/cms/getters'
import { fetchContentByKey } from '@/cms/utils/fetchContent'
import { ProductDetailTemplate } from '@/components/page-templates'
import getCategoryTree from '@/lib/api/operations/get-category-tree'
import getProduct from '@/lib/api/operations/get-product'
import { productGetters } from '@/lib/getters'
import type { CategoryTreeResponse } from '@/lib/types'

import type { NextPage, GetServerSidePropsContext } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context
  const pageData = await fetchContentByKey(context)
  const productCode = pageData?.productCode
  const cmsProductDetail = pageData && {
    components: amplienceGetters.getAmplienceProductDetailsPageData(pageData) || [],
  }
  const product = await getProduct(productCode)
  const categoriesTree: CategoryTreeResponse = await getCategoryTree()

  return {
    props: {
      product,
      categoriesTree,
      cmsProductDetail,
      ...(await serverSideTranslations(locale as string, ['common', 'product'], nextI18NextConfig)),
    },
  }
}

const ProductDetailPage: NextPage = (props: any) => {
  const { product, cmsProductDetail } = props

  const breadcrumbs = product ? productGetters.getBreadcrumbs(product) : []
  return (
    <>
      <ProductDetailTemplate product={product} breadcrumbs={breadcrumbs}>
        {cmsProductDetail?.components?.length > 0 &&
          cmsProductDetail?.components?.map((data: any) => (
            <CmsComponent key={Object.keys(data)[0]} content={data} />
          ))}
      </ProductDetailTemplate>
    </>
  )
}

export default ProductDetailPage
