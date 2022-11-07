import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { amplienceGetters } from '@/cms/getters'
import CmsComponent from '@/components/home/CmsComponent/CmsComponent'
import { FullWidthLayout } from '@/components/layout'
import getCategoryTree from '@/lib/api/operations/get-category-tree'
import type { CategoryTreeResponse, NextPageWithLayout } from '@/lib/types'
import nextI18NextConfig from 'next-i18next.config'

import type { GetServerSidePropsContext } from 'next'

interface VisualizationPageProps {
  cmsPage: any
}

function fetchContentById<T = any>(context?: any): Promise<T> {
  return fetch(
    `https://${context?.query?.api}/content/id/${context?.query?.content}?depth=all&format=inlined`
  )
    .then((resp) => {
      return resp.json()
    })
    .then((body) => {
      return body.content
    })
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context
  const categoriesTree: CategoryTreeResponse = await getCategoryTree()

  const pageData = await fetchContentById(context)
  const cmsPage = pageData &&
    pageData?.contentTypes && {
      components: amplienceGetters.getAmplienceHomePageData(pageData?.contentTypes) || [],
    }
  return {
    props: {
      categoriesTree,
      cmsPage,
      ...(await serverSideTranslations(locale as string, ['common'], nextI18NextConfig)),
    },
  }
}

const Visualization: NextPageWithLayout<VisualizationPageProps> = (props) => {
  const { cmsPage } = props
  return (
    <>
      {cmsPage?.components?.map((data: any) => (
        <CmsComponent key={Object.keys(data)[0]} content={data} />
      ))}
    </>
  )
}

Visualization.getLayout = FullWidthLayout

export default Visualization
