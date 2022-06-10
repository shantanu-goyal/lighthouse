# Devtools e2e Tests

These tests are rolled into the Chromium DevTools Frontend codebase. They "belong" to the devtools frontend, but are truly defined in this Lighthouse repo.

See `lighthouse-core/test/chromium-web-tests/README.md` for more.

## Sync

```sh
rsync -ahvz --exclude='OWNERS' --exclude='BUILD.gn' ~/src/devtools/devtools-frontend/test/e2e/lighthouse/ third-party/devtools-tests/e2e/lighthouse/
```
