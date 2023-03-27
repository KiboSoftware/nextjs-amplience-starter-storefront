import getConfig from 'next/config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { CmsComponent } from '@/cms/components'
import { amplienceGetters } from '@/cms/getters'
import { fetchContentByKey } from '@/cms/utils/fetchContent'
import { FullWidthLayout } from '@/components/layout'
import getCategoryTree from '@/lib/api/operations/get-category-tree'
import type { CategoryTreeResponse, NextPageWithLayout } from '@/lib/types'

import type { GetServerSidePropsContext } from 'next'

interface PreviewPageProps {
  cmsPage: any
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let cmsPage
  const { locale } = context
  const { publicRuntimeConfig } = getConfig()
  const categoriesTree: CategoryTreeResponse = await getCategoryTree()

  const pageData = await fetchContentByKey(context)
  if (
    pageData?._meta?.name ===
    publicRuntimeConfig.amplience?.productDetailPageContentTypes?.pdpProducts
  ) {
    cmsPage = pageData && {
      components: amplienceGetters.getAmplienceProductDetailsPageData(pageData) || [],
    }
  } else {
    cmsPage = pageData &&
      pageData && {
        components: amplienceGetters.getAmplienceHomePageData(pageData?.contentTypes) || [],
      }
  }
  return {
    props: {
      categoriesTree,
      cmsPage,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const Preview: NextPageWithLayout<PreviewPageProps> = (props) => {
  const { cmsPage } = props
  return (
    <>
      {cmsPage?.components?.map((data: any) => (
        <CmsComponent key={Object.keys(data)[0]} content={data} />
      ))}
    </>
  )
}

Preview.getLayout = FullWidthLayout

export default Preview
