# @tineco/create-frontend-template

Create a JavaScript-only Vue starter that keeps `@gauss/core` and `@gauss/utils`.

## Usage

```bash
npx @tineco/create-frontend-template my-app
```

Create from a custom Git template:

```bash
npx @tineco/create-frontend-template my-app --git https://github.com/example/template.git
```

Clone a specific branch:

```bash
npx @tineco/create-frontend-template my-app --git https://github.com/example/template.git --branch main
```

## Publish to npm (Public)

This repository is hosted on GitHub and the package is published to the public npm registry.

1. Update version:
   ```bash
   npm version patch
   ```
2. Login and verify account:
   ```bash
   npm login
   npm whoami
   ```
3. Publish:
   ```bash
   npm publish --access public
   ```

Optional check before publish:

```bash
npm pack
```
