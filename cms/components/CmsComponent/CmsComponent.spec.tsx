import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './CmsComponent.stories'

const { SmallBanner, HeroCarousel, LargePromoBlocks, SmallPromoBlocks } = composeStories(stories)

const SmallBannerMock = () => <div data-testid="small-banner-component" />
const HeroCarouselMock = () => <div data-testid="hero-carousel-component" />
const ContentTileMock = () => <div data-testid="content-tile-component" />
jest.mock('@/components/home/SmallBanner/SmallBanner', () => () => SmallBannerMock())
jest.mock('@/components/home/Carousel/KiboHeroCarousel', () => () => HeroCarouselMock())
jest.mock('@/components/home/ContentTile/ContentTile', () => () => ContentTileMock())

describe('[component] - CmsComponent', () => {
  it('should render component', () => {
    render(<SmallBanner {...SmallBanner.args} />)
    const SmallBannerComponent = screen.getByTestId('small-banner-component')

    expect(SmallBannerComponent).toBeInTheDocument()
  })

  it('should render hero carousel component', () => {
    render(<HeroCarousel {...HeroCarousel.args} />)
    const HeroCarouselComponent = screen.getByTestId('hero-carousel-component')

    expect(HeroCarouselComponent).toBeInTheDocument()
  })

  it('should render large content tile component', () => {
    render(<LargePromoBlocks {...LargePromoBlocks.args} />)
    const ContentTile = screen.getByTestId('content-tile-component')

    expect(ContentTile).toBeInTheDocument()
  })

  it('should render small content tile component', () => {
    render(<SmallPromoBlocks {...SmallPromoBlocks.args} />)
    const ContentTile = screen.getByTestId('content-tile-component')

    expect(ContentTile).toBeInTheDocument()
  })
})
