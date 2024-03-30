# Web3 Full Stack Layer SaaS

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Nuxt UI Pro][nuxt-src]][nuxt-href]

Web3 Full Stack Layer SaaS is a pre-made SaaS Template Layer that user can just extent this layer to have the power of the `@web3-fullstack/layer` and `@nuxt/ui-pro` ability and with SaaS relateive feature such as docs, blog, sign in/up,

- [Documentation](.docs)

## Templates

* [Web3 Full Stack Template SaaS](https://github.com/Web3-FullStack/template-saas)

## Installation

```bash
# npm
npm install @web3-fullstack/layer-saas
# yarn
yarn add @web3-fullstack/layer-saas
# pnpm
pnpm add @web3-fullstack/layer-saas
# bun
bun add @web3-fullstack/layer-saas
```

Next, add it to your `nuxt.config.ts` in the `extends` property:

```ts
export default defineNuxtConfig({
  extends: ['@web3-fullstack/layer-saas']
})
```

Start your development server, you should now be able to use all the components, composables and utils from Nuxt UI, Nuxt UI Pro, and Web3 Full Stack Layer SaaS 🚀

## License Key

Web3 Full Stack Layer is free in development, but you need a license to use it in production. You can choose between **Solo** and **Team**, both will give you access to the same features and give you a license key required to build your apps. The main difference is the number of developers that can be invited to the private GitHub repository.

Once you've purchased [Nuxt UI Pro](https://ui.nuxt.com/pro?aff=KokMD), you will receive an email with a license key to activate. Visit <https://ui.nuxt.com/pro/activate> to activate your license with your GitHub username and license key, you will be invited to the private GitHub repository.

Then, use your license key in your `.env` file:

```sh
# .env
NUXT_UI_PRO_LICENSE=<your-license-key>
NUXT_WEB3_FULL_STACK_LAYER_LICENSE=<your-license-key>
```

If you have multiple projects on your machine, you can also add it to your `~/.nuxtrc`:

```sh
uiPro.license=<your-token>
```

## Showcase

Here are some projects using Web3 Full Stack Layer:

- [RWA-Wallet](https://RWA-Wallet.com)
- [AO Arena DAO](https://github.com/HelloRWA/Web3-FullStack-Starter)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@web3-fullstack/layer-saas/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@web3-fullstack/layer-saas

[npm-downloads-src]: https://img.shields.io/npm/dm/@web3-fullstack/layer-saas.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/@web3-fullstack/layer-saas

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://ui.nuxt.com/pro?aff=KokMD

## License

*In progress. You cannot repackage Web3 Full Stack Layer or copy/paste the components into premium templates, UI libraries or open source projects.*
