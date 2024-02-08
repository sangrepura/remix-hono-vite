<div style="display: flex; flex-direction: column; align-items: center;">
  <div style="display: flex; gap: 20px;">
    <img src="https://remix.run/img/og.1.jpg" alt="Remix Logo" width="200"/>
    <img src="https://avatars.githubusercontent.com/u/98495527?s=200&v=4" alt="Hono Logo" width="100"/>
    <img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg" alt="Vite Logo" width="100"/>
  </div>
  <div style="height: 20px;"></div> <!-- Gap between rows -->
  <div style="display: flex; gap: 20px;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="TypeScript Logo" width="100"/>
    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="Tailwind CSS Logo" width="100"/>
  </div>
</div>
<br/>

<h1>Remix + Hono + Vite + Typescript + TailwindCSS
<br/>
Starter Template</h1>

This is a starter template for [Remix](https://remix.run) with [Hono](https://hono.dev) via the [remix-hono](https://remix.run/resources/remix-+-hono) middleware and the [@hono/vite-dev-server](https://github.com/honojs/vite-plugins/tree/main/packages/dev-server) plugin

See the [Remix docs](https://remix.run/docs) and the [Remix Vite docs](https://remix.run/docs/en/main/future/vite) for details on supported features.

## How it works

- On the local dev, you rely on [Hono Vite dev server](https://github.com/honojs/vite-plugins/blob/main/packages/dev-server/README.md)
- When building, `server/build.ts` bundles 
  `server/index.ts` and `server/middlewares.ts` to `build/server/index.js`
- If you deploy with Docker, it should be as easy as just copying the `build` folder and `node_modules`.

## Development

Copy `.env.example` to `.env` and fill the variables. (it is loaded by Remix for you, see [this PR](https://github.com/remix-run/remix/pull/7958))

Run the Hono server with [Hono Vite dev server](https://github.com/honojs/vite-plugins/blob/main/packages/dev-server/README.md):

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Hono applications you should be right at home. Just make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`
