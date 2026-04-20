# Repository Guidelines

## Project Structure & Module Organization
This package is a CLI scaffold for Vue projects.

- `bin/create-frontend-template.js`: Node CLI entry that copies the template and rewrites `package.json` name.
- `template/`: Vite + Vue 3 starter app distributed to end users.
- `template/src/`: application code (`views/`, `router/`, `stores/`, `api/`, `utils/`, `styles/`).
- `README.md`: usage and publishing notes for GitLab npm registry.

When adding new scaffold features, update both the template files and CLI behavior if generation logic changes.

## Build, Test, and Development Commands
Root package (this repository):

- `npm pack`: build a local tarball to validate published contents (`bin`, `template`).
- `npm publish`: publish package (usually done by CI).
- `node bin/create-frontend-template.js demo-app`: generate a local test project.

Generated template project (inside created app or `template/` for local checks):

- `npm install`: install dependencies.
- `npm run dev`: start Vite dev server.
- `npm run build`: create production bundle.
- `npm run preview`: preview built bundle locally.

## Coding Style & Naming Conventions
- JavaScript uses 2-space indentation, semicolon-free style, and `const`/`let` (no `var`).
- Use `camelCase` for variables/functions (`rewritePackageName`), `PascalCase` for Vue view components (`Home.vue`), and kebab-case for package names.
- Keep CLI code synchronous unless async is clearly needed; current implementation is sync and simple.
- Preserve path aliases and structure used by Vite (`@` -> `src`).

## Testing Guidelines
No automated test framework is configured yet. Validate changes with:

1. `node bin/create-frontend-template.js tmp-app`
2. `cd tmp-app && npm install && npm run build`
3. `npm run dev` smoke test (routing, store init, style imports)

If you add tests, place them under `template/src/**/__tests__/` or `template/tests/` and document the run command in `package.json`.

## Commit & Pull Request Guidelines
- Keep commit messages short and imperative; history currently uses concise summaries (for example: `模板工程初始化`, `Initial commit`).
- Prefer one logical change per commit.
- PRs should include: purpose, key file changes, local verification steps, and screenshots/GIFs for UI-visible changes in the template app.
- Link related issue/task IDs when available.
