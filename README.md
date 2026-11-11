# PortfolioNg

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.2.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
npm run build
```

The production build is a static site in `dist/portfolio-ng/browser`, with French at `/` and English at `/en/`. `ng serve` still runs the local server, including `POST /api/contact`.

## Netlify

Connect the repository on Netlify. The site reads [`netlify.toml`](netlify.toml): Node 22, `npm run build`, and publish directory `dist/portfolio-ng/browser`. Pages are served from the CDN. `POST /api/contact` is rewritten to a Node function that sends the message with the existing SMTP settings.

In the Netlify site settings, add these environment variables. Keep the values out of git. `.env` is already ignored.

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_TO`
- `CONTACT_FROM`

A local build leaves the `hreflang` links relative. On Netlify, the build rewrites them to absolute URLs when `DEPLOY_PRIME_URL` or `URL` is set.

If a deployed send times out, Gmail is often refusing the platform address. Point `SMTP_HOST` at a provider that accepts mail from Netlify, or try port `465`.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
