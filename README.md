<h2 align="center">KiboCommerce & Next.JS & Amplience</h2>

<p align="center">
This is a headless ecommerce starter kit for KiboCommerce platform using Next.JS <br>
Demo: <a href="https://nextjs-storefront-kibo-commerce.vercel.app">https://nextjs-storefront-kibo-commerce.vercel.app</a>
</p>

### Features

- Performant by default
- SEO Ready
- Internationalization
- Responsive
- UI Components built on top of Material UI 5
- Theming
- KiboCommerce data hooks
- PWA Ready
- Omni Channel Capability (Ship to home and Pickup in Store support)
- Amplience integration

## Getting Started

1. Clone this repo

```bash
git clone https://github.com/KiboSoftware/nextjs-amplience-starter-storefront.git
```

2. Change into directory and install dependencies

```bash
npm install
```

3. Copy .env template

```bash
cp .env.template .env.local
```

4. Configure env variables for your Kibo Commerce environment
5. Start Dev server

```bash
npm run dev
```

## Configuration

.env example

```bash
KIBO_API_HOST=t1234-s1234.sandbox.mozu.com
KIBO_AUTH_HOST=home.mozu.com
KIBO_CLIENT_ID=KIBO_APP.1.0.0.Release
KIBO_SHARED_SECRET=12345_Secret
```

The following data is required to configure the storefront to communicate with your Kibo API Client.

- `apiHost` - Your Kibo Commerce API Host.
- `authHost` - Kibo Commerce Authentication Host Server. It is used to request an access token from Kibo Commerce OAuth 2.0 service. Production and Production sandbox, use `home.mozu.com`
- `clientId` - Unique Application (Client) ID of your Application
- `sharedSecret` - Secret API key used to authenticate application. Viewable from your [Kibo eCommerce Dev Center](https://mozu.com/login)

Visit [Kibo documentation](https://apidocs.kibong-perf.com/?spec=graphql#auth) for more details on API authentication

next.config.js example

```bash
hubName= hub_name
contentTypeUrl= 'https://example.com/home-page' and 'https://example.com/pdp-products'
format= inlined
depth=  all
VSE Domain= vse_domain_url
Delivery Key= delivery_key
Content Sys Id= content_sys_id
Image Domain= 'cdn.media.amplience.net' and 'vse_domain.staging.bigcontent.io'
```

The following data is required to configure the storefront to communicate with your Amplience cms.

- `hubName` : The hub name used in the APIs is available from the "properties" item from the "settings" menu.
- `contentTypeUrl`: A content type consists of the content type schema URL, together with a label and optionally an icon, card and one or more visualizations. Content types are what business users will use to create content in the Dynamic Content app.
- `format`: The format parameter allows you to specify whether content is retrieved in bandwidth optimised linked data format or inlined as a content tree.
- `depth` : The depth parameter allows you to control whether to return items linked to the specified content item.
- `{{vse.domain}}` : The staging environment for fetching staged content.
- `{delivery.key}` : Used to fetch a Content Item by Delivery Key (For Preview).
- `{{content.sys.id}}` : Used to fetch a Content Item by ID (For Visualization).

## Useful Commands

```bash
npm run dev # Start dev server
npm run build # Run production build
npm run start # Run production start
npm run generate-types # generate typescript Kibo API types from GraphQL Schema
npm run storybook # start storybook for
npm run test # run unit / integration tests
```

## Built with

- Framework - [Next.JS](https://nextjs.org/docs)
- Component Library - [Material UI 5](https://mui.com/material-ui/getting-started/overview/)
- Testing - [Jest](https://jestjs.io/docs/getting-started)
- Data Fetching / State Management - [React Query](https://react-query-v3.tanstack.com/overview)
- Localization - [Next i18Next](https://github.com/i18next/next-i18next)

## Pre-requisite

- You must have a virtual staging environment specified in your settings in order to show visualizations for any content.
- The current user's IP address must be in the whitelist of approved IP addresses in order for the visualization to be displayed.
- Follow Steps mentioned in link for configuring amplience cms (https://github.com/KiboSoftware/amplience-demo-data).
- Next, after above steps data can be created on amplience website (Need an account prior on amplience cms).

## Visualization mode in Amplience

- A visualization lets your users preview an individual piece of content by embedding your app in the content editing interface.
- Dynamic Content tells your app which content item the user wants to view and your app fetches that content and renders it.
- The visualization is displayed in an iFrame side by side with the content form and can also be shown as a pop out visualization in its own window.
- Visualizations make use of a virtual staging environment (VSE) to allow you to preview content before it's published.
- The visualization environment will usually be configured for you at the beginning of your project and can be configured from the "Visualization settings" menu in the Dynamic Content app.

## Preview mode in Amplience

- A content preview app provides a way for you to preview content in your website, app or other channel and allows you to see how it will look before it goes live.
- Developing a preview app is to configure an online resource that will be used to preview your content. This resource can be as simple or complex as you like, from a single page to an entire website or a mobile app running on an online simulator.

## Contributions

- All contributions welcome!
