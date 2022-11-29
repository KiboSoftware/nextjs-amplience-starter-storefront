import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const formatLinkData = (links: any) => {
  const { link: title, url: href } = links
  return { title, href }
}

const formatSmallBannerData = (smallBannerData: any) => {
  return {
    small_banner: smallBannerData
      ? {
          title: smallBannerData?.title,
          subtitle: smallBannerData?.subtitle,
          call_to_action_link:
            {
              title: smallBannerData?.callToActionText,
              href: smallBannerData?.callToActionUrl,
            } || null,
          background_color: smallBannerData?.backgroundColor,
        }
      : null,
  }
}

const formatHeroCarouselData = (heroCarouselData: any) => {
  const heroCarouselItems = heroCarouselData
    ? {
        desktop_image: {
          url: `https://${heroCarouselData?.desktopImage?.defaultHost}/i/${heroCarouselData?.desktopImage?.endpoint}/${heroCarouselData?.desktopImage?.name}`,
        },
        mobile_image: {
          url: `https://${heroCarouselData?.mobileImage?.defaultHost}/i/${heroCarouselData?.mobileImage?.endpoint}/${heroCarouselData?.mobileImage?.name}`,
        },
        title: heroCarouselData?.title,
        subtitle: heroCarouselData?.subtitle,
        description: heroCarouselData?.description,
        button_link: {
          title: heroCarouselData?.callToAction?.text,
          href: heroCarouselData?.callToAction?.href,
        },
      }
    : null

  return {
    hero_carousel: {
      hero_carousel_items: heroCarouselItems ? [heroCarouselItems] : [],
    },
  }
}

const formatHomePageProductsData = (homePageProductsData: any) => {
  const homePageProductsReference =
    homePageProductsData?.products.map((reference: any) => ({
      title: reference?.title,
      home_page_products: reference?.productSelector?.map((productCode: string) => productCode),
    })) || null

  return {
    home_page_products: {
      reference: homePageProductsReference,
    },
  }
}

const formatPromoBlocksLinksData = (linksData: { link: string; url: string }[]) =>
  linksData?.map((link: any) => formatLinkData(link))

const formatPromoBlocksData = (promoBlocksData: any) => {
  return (
    promoBlocksData?.blocks?.map((promoBlock: any) => ({
      title: promoBlock?.title,
      subtitle: promoBlock?.subtitle,
      image: {
        url: `https://${promoBlock?.image?.defaultHost}/i/${promoBlock?.image?.endpoint}/${promoBlock?.image?.name}`,
      },
      links: formatPromoBlocksLinksData(promoBlock?.links),
    })) || null
  )
}

const formatLargePromoBlocksData = (largePromoBlocksData: any) => ({
  large_promo_blocks: {
    large_promo_blocks: formatPromoBlocksData(largePromoBlocksData),
  },
})

const formatSmallPromoBlocksData = (smallPromoBlocksData: any) => ({
  small_promo_blocks: {
    small_promo_blocks: formatPromoBlocksData(smallPromoBlocksData),
  },
})

const getAmplienceHomePageData = (ampliencePageData: any) => {
  const smallBanner =
    formatSmallBannerData(
      ampliencePageData?.find(
        (data: any) =>
          data?._meta?.name === publicRuntimeConfig.amplience?.homePageContentTypes?.smallBanner
      )
    ) || null
  const heroCarousel =
    formatHeroCarouselData(
      ampliencePageData?.find(
        (data: any) =>
          data?._meta?.name ===
          publicRuntimeConfig.amplience?.homePageContentTypes?.heroCarouselItem
      )
    ) || null

  const homePageProducts =
    formatHomePageProductsData(
      ampliencePageData?.find(
        (data: any) =>
          data?._meta?.name ===
          publicRuntimeConfig.amplience?.homePageContentTypes?.homePageProducts
      )
    ) || null

  const largePromoBlocks =
    formatLargePromoBlocksData(
      ampliencePageData?.find(
        (data: any) =>
          data?._meta?.name ===
          publicRuntimeConfig.amplience?.homePageContentTypes?.largePromoBlocks
      )
    ) || null

  const smallPromoBlocks =
    formatSmallPromoBlocksData(
      ampliencePageData?.find(
        (data: any) =>
          data?._meta?.name ===
          publicRuntimeConfig.amplience?.homePageContentTypes?.smallPromoBlocks
      )
    ) || null
  return [smallBanner, heroCarousel, homePageProducts, largePromoBlocks, smallPromoBlocks]
}

export const visualizationGetters = {
  getAmplienceHomePageData,
}
