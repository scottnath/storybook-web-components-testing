# POC: Storybook web component testing

See `Initial Setup` below for information on the shared-tests included in this repo

* [./MyElement.stories.js](./MyElement.stories.js) contains the shadowroot element's stories
* [./src/MyElement.shared-spec.js](./src/MyElement.shared-spec.js) contains the shared tests used in the interaction tests for the stories

See article for details:

[**Storybook setup: Virtual Screen Reader in Web Components**](https://scottnath.com/blahg/virtual-screen-reader-with-web-components/)

## Setup to run web component testing in Storybook

### NPM Modules

You need two extra modules to run recreate the tests in this repo

#### Virtual screen reader

Integrating the @guidepup/virtual-screen-reader is detailed in [Simple setup: Virtual Screen Reader in Storybook](https://dev.to/scottnath/simple-setup-virtual-screen-reader-in-storybook-2efo)

#### shadow-dom-testing-library

A must-have for any testing-library-related work testing shadowroot stuffs is [KonnorRogers/shadow-dom-testing-library](https://github.com/KonnorRogers/shadow-dom-testing-library)

## Initial setup

The initial setup of this repo draws on previous work about Storybook and testing components as well as starting from a generic Storybook setup.

### Source repo

The original source code is copied from the [Storybook starter for Vite + Lit, Javascript](https://github.com/storybookjs/sandboxes/tree/next/lit-vite/default-js/after-storybook). It uses Storybook 8.

### Shared tests in *.shared-spec.js files

This repo showcases a web components storybook environment _with testing_. **The web component tests can be found in [./src/MyElement.shared-spec.js](./src/MyElement.shared-spec.js)

The `shared-spec` files and tests in `./src/stories` originate from the shared testing examples detailed in the series [Sharing tests across UI components](https://dev.to/scottnath/series/22727). That series details what shared tests are conceptually and details how to write shareable tests which work across components and across javascript frameworks.

The initial tests in the :tada: commit were direct copies from that series' codebase.