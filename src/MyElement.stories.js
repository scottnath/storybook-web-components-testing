import { virtual } from '@guidepup/virtual-screen-reader';
import { expect } from '@storybook/test';

import './my-element.js';
import './index.css';
import { getElements } from './MyElement.shared-spec.js';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Lit/MyElement',
  component: 'my-element',
  tags: ['autodocs'],
  render: (args) => {
    const attributes = attrGen(args);
  
    return `
      <my-element ${attributes}></my-element>
    `;
  },
};

export const Defaults = {}

export const WithAttrs = {
  args: {
    count: 5,
    docsHint: 'This is a meow',
  },
  // add the play method - it's where you put your tests!
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    console.log(elements, canvasElement)
    expect(elements).toBeTruthy();
    // Start up the Virtual Screen Reader, giving it the canvasElement
    await virtual.start({ container: canvasElement });

    // This `while` statement navigates through the component using the 
    //  virtual screen reader to speak the text whereever the cursor is located.
    //  It will continue until it reaches the end of the <header> element, 
    //  which has a `banner` aria role, thus "end of banner"
    // while ((await virtual.lastSpokenPhrase()) !== args.docsHint) {
    //   console.log(await virtual.spokenPhraseLog())
    //   // `.next()` moves the Virtual cursor to the next location.
    //   await virtual.next();
    // }

    // What we expect the screen reader to say
    const expected = [
      'banner',
      // it is an `<h1>`, so `level 1`
      'heading, Acme, level 1',
      'Welcome,',
      // Using `args` here allows you to change args without breaking the test
      args.user.name,
      '!',
      'button, Log out',
      'end of banner'
    ]

    // Here's the test! It asserts the screen reader said what we expected.
    //  When we called `lastSpokenPhrase` every time the `while` looped, 
    //  the spoken text was added to the `PhraseLog`, in order
    expect(await virtual.spokenPhraseLog()).toEqual(expected);
    
    // Stop your virtual screen reader instance
    await virtual.stop();
  }
}