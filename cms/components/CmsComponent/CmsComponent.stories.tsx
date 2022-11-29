import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import CmsComponent from './CmsComponent'
import { cmsHomePageResultMock } from '@/__mocks__/stories/cmsHomePageResultMock'

// Home
export default {
  title: 'Cms/CmsComponent',
  component: CmsComponent,
} as ComponentMeta<typeof CmsComponent>

const Template: ComponentStory<typeof CmsComponent> = (args) => <CmsComponent {...args} />

export const SmallBanner = Template.bind({})
SmallBanner.args = {
  content: cmsHomePageResultMock.find((data) => Object.keys(data)[0] === 'small_banner'),
}

export const HeroCarousel = Template.bind({})
HeroCarousel.args = {
  content: cmsHomePageResultMock.find((data) => Object.keys(data)[0] === 'hero_carousel'),
}

export const LargePromoBlocks = Template.bind({})
LargePromoBlocks.args = {
  content: cmsHomePageResultMock.find((data) => Object.keys(data)[0] === 'large_promo_blocks'),
}

export const SmallPromoBlocks = Template.bind({})
SmallPromoBlocks.args = {
  content: cmsHomePageResultMock.find((data) => Object.keys(data)[0] === 'small_promo_blocks'),
}
