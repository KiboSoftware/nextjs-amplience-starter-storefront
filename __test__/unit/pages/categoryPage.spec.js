import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import * as nextRouter from 'next/router'

import { categoryTreeDataMock } from '@/__mocks__/stories/categoryTreeDataMock'
import { createMockRouter, createQueryClientWrapper } from '@/__test__/utils'
import CategoryPage, { getServerSideProps } from '@/pages/category/[categoryCode]'

nextRouter.useRouter = jest.fn()
const mockCategoryTreeData = categoryTreeDataMock
const mockProductSearchData = {
  totalCount: 1,
  pageSize: 20,
  pageCount: 3,
  startIndex: 0,
  items: [
    {
      productCode: 'Jacket12',
      productUsage: 'Configurable',
      isPackagedStandAlone: false,
    },
  ],
  facets: [],
}

jest.mock('@/lib/api/util', () => ({
  fetcher: jest.fn(() => {
    return Promise.resolve({
      data: {
        products: mockProductSearchData,
        categoriesTree: { items: mockCategoryTreeData.categoriesTree?.items },
      },
    })
  }),
}))

jest.mock('next-i18next/serverSideTranslations', () => ({
  serverSideTranslations: jest.fn(() => {
    return Promise.resolve({
      _nextI18Next: {
        initialI18nStore: { 'mock-locale': [{}], en: [{}] },
        initialLocale: 'mock-locale',
        userConfig: { i18n: [{}] },
      },
    })
  }),
}))

const ProductListingTemplateMock = () => <div data-testid="productListingTemplate-mock" />
jest.mock(
  '@/components/page-templates/ProductListingTemplate/ProductListingTemplate.tsx',
  () => ProductListingTemplateMock
)

jest.mock('@/lib/api/util/getUserClaimsFromRequest.ts', () => jest.fn(() => null))

describe('[page] Category Page', () => {
  it('should run getServerSideProps method', async () => {
    const context = {
      query: {
        categoryCode: '40',
      },
      locale: 'mock-locale',
      res: { setHeader: jest.fn() },
    }

    const response = await getServerSideProps(context)
    const mockCategoryTreeByCode = categoryTreeDataMock?.categoriesTree?.items.find(
      (category) => category.categoryCode === '40'
    )
    expect(response).toStrictEqual({
      props: {
        results: mockProductSearchData,
        categoriesTree: mockCategoryTreeData.categoriesTree.items,
        category: {
          categories: [mockCategoryTreeByCode],
        },
        _nextI18Next: {
          initialI18nStore: { 'mock-locale': [{}], en: [{}] },
          initialLocale: 'mock-locale',
          userConfig: { i18n: [{}] },
        },
      },
    })
  })

  it('should render the Category page template', () => {
    nextRouter.useRouter.mockImplementation(() => ({ query: { categoryCode: '41' } }))
    const router = createMockRouter()
    render(
      <RouterContext.Provider value={router}>
        <CategoryPage />
      </RouterContext.Provider>,
      {
        wrapper: createQueryClientWrapper(),
      }
    )

    const productListingTemplate = screen.getByTestId('productListingTemplate-mock')
    expect(productListingTemplate).toBeVisible()
  })
})
