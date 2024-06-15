const title =  'Template Layer SaaS'

export default defineAppConfig({
  title,
  titleBadge: 'Beta',
  titleTemplate: `%s - ${title}`,
  description: 'A Web3 Full Stack SaaS Template based on Web3 Full Stack Layer SaaS',
  ogImage: "https://dashboard-template.nuxt.dev/social-card.png",
  twitterImage: "https://dashboard-template.nuxt.dev/social-card.png",
  twitterCard: "summary_large_image",
  showFooterTop: true,
  links: [
    {
      label: 'Docs',
      to: '/docs'
    },
    {
      label: 'Pricing',
      to: '/pricing'
    },
    {
      label: 'Blog',
      to: '/blog'
    }
  ],
  ui: {
    primary: 'sky',
    gray: 'cool',
    tooltip: {
      default: {
        openDelay: 500
      }
    }
  }
})
