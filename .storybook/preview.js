import { expect } from '@storybook/test';

global.expect = expect;

/**
 * Generate an attribute string from args
 */
global.attrGen = (args) => Object.entries(args)
.filter(([key, value]) => value)
.map(([key, value]) => `\n  ${key}="${value}"`)
.join(' ');

/** @type { import('@storybook/web-components').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
