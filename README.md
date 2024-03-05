# Storybook web component testing

## Initial setup

The initial setup of this repo draws on previous work about Storybook and testing components as well as starting from a generic Storybook setup.

### Source repo

The original source code is copied from the [Storybook starter for Vite + Lit, Javascript](https://github.com/storybookjs/sandboxes/tree/next/lit-vite/default-js/after-storybook). It uses Storybook 8.

### Shared tests in *.shared-spec.js files

This repo will showcase a web components storybook environment _with testing_. The `shared-spec` files and tests originate from the shared testing examples detailed in the article series [Sharing tests across UI components](https://dev.to/scottnath/series/22727). That series details what shared tests are conceptually and details code to share tests across components and across javascript frameworks.

The initial tests in the :tada: commit were direct copies from that series' codebase.

### Virtual screen reader setup

Integrating the @guidepup/virtual-screen-reader is detailed in [Simple setup: Virtual Screen Reader in Storybook](https://dev.to/scottnath/simple-setup-virtual-screen-reader-in-storybook-2efo)