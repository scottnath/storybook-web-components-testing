import { virtual } from '@guidepup/virtual-screen-reader';
import { expect, userEvent, fireEvent } from '@storybook/test';

import './my-element.js';
import './index.css';
import {
  getElements,
  ensureElements,
  ensureScreenRead,
  ensureButtonScreenRead,
  testTabOrder
} from './MyElement.shared-spec.js';


export default {
  title: 'Lit/MyElement',
  component: 'my-element',
  render: (args) => {
    // `attrGen` generates a string of HTML attributes (see .storybook/preview.js)
    const attributes = attrGen(args);
  
    return `
      <my-element ${attributes}></my-element>
    `;
  },
};

export const Defaults = {
  args: {
    count: 0,
    docsHint: 'Click on the Vite and Lit logos to learn more',
  },
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    await ensureElements(elements, args);
    await ensureScreenRead(elements, args);
    await ensureButtonScreenRead(elements, args);
    await testTabOrder(elements, args);
  }
}

export const WithAttrs = {
  args: {
    count: 5,
    docsHint: 'This is a meow',
  },
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    await ensureElements(elements, args);
    await ensureScreenRead(elements, args);
    await ensureButtonScreenRead(elements, args);
    await testTabOrder(elements, args);
  }
}
