/**
 * @fileoverview these are the shared tests for the MyElement component
 * 
 * Shared tests are detailed in the series "Sharing tests across UI components" 
 * @see https://dev.to/scottnath/series/22727
 */

import { virtual } from '@guidepup/virtual-screen-reader';
import { userEvent, within } from '@storybook/test';
import { within as shadowWithin } from 'shadow-dom-testing-library';

import { findTabbable } from './helper-vsr-tabnodes.js';

/**
 * Extract elements from an HTMLElement
 */
export const getElements = async (canvasElement) => {
  const screen = shadowWithin(canvasElement);
  const elm = await canvasElement.querySelector('my-element');
  const container = await screen.findByShadowLabelText(/My Element/i);
  const viteLogo = await screen.queryByShadowAltText('Vite logo');
  const viteLink = await viteLogo?.closest('a');
  const litLogo = await screen.queryByShadowAltText('Lit logo');
  const litLink = await litLogo?.closest('a');

  return { 
    screen,
    elm,
    container,
    button: await screen.queryByShadowRole('button'),
    viteLogo,
    viteLink,
    litLogo,
    litLink,
    hint: await container.querySelector('.read-the-docs'),
  };
}

/**
 * Ensure elements are present and have the correct attributes/content
 */
export const ensureElements = async (elements, args) => {
  await expect(elements.container).toBeTruthy();
  await expect(elements.viteLogo).toBeTruthy();
  await expect(elements.viteLogo).toBeTruthy();
  await expect(elements.litLogo).toBeTruthy();
  await expect(elements.litLink).toBeTruthy();
  await expect(elements.hint).toBeTruthy();
  await expect(elements.hint).toHaveTextContent(args.docsHint);
  await expect(elements.button).toBeTruthy();
  await expect(elements.button).toHaveTextContent(`count is ${args.count}`);
  await userEvent.click(elements.button);

  await expect(elements.button).toHaveTextContent(`count is ${args.count + 1}`);
  // Changing `args.count` here changes `args` for all subsequent test methods
  args.count++;
}

/**
 * Extract the expected screen reader spoken output.
 * @param {Object} args - element configuration object
 * @returns {string[]} - array of strings representing the expected screen reader output
 */
export const getExpectedScreenText = (args) => {
  // What we expect the screen reader to say
  return [
    'region, My Element',
    'link, Vite logo',
    'img, Vite logo',
    'end of link, Vite logo',
    'link, Lit logo',
    'img, Lit logo',
    'end of link, Lit logo',
    `button, count is ${args.count}`,
    args.docsHint,
    'end of region, My Element'
  ]
}

/**
 * Ensure the screen reader reads the correct content
 */
export const ensureScreenRead = async (elements, args) => {
  const expected = getExpectedScreenText(args);
    
  // Start up the Virtual Screen Reader, giving it the container _INSIDE THE SHADOW DOM_
  await virtual.start({ container: elements.container });

  let failsafe = 30;
  // This `while` statement navigates through the component using the 
  //  virtual screen reader to speak the text where the cursor is located.
  //  It will continue until it reaches the last item in the expected array.
  while ((await virtual.lastSpokenPhrase()) !== expected[expected.length - 1] && failsafe > 0) {
    // `.next()` moves the Virtual cursor to the next location.
    await virtual.next();
    // just in case we don't have the last expected text correct
    failsafe--;
  }

  /**
   * This section can be much simpler, but the phraseLog is iterated through to
   *  show in the Storybook Interactions Addon panel what each phrase was.
   * 
   * @example simpler version
   * 
   * expect(await virtual.spokenPhraseLog()).toEqual(expected);
   */
  const phraseLog = await virtual.spokenPhraseLog();
  expect(phraseLog.length).toEqual(expected.length);
  for (let i = 0; i < phraseLog.length; i++) {
    expect(phraseLog[i]).toEqual(expected[i]);
  }
  
  // Stop virtual screen reader
  await virtual.stop();
}

/**
 * Tests triggering the button with the screen reader functionality
 */
export const ensureButtonScreenRead = async (elements, args) => {
  // Start up the Virtual Screen Reader, giving it the button
  await virtual.start({ container: elements.button });
  await expect(await virtual.lastSpokenPhrase()).toEqual(`button, count is ${args.count}`);
  await virtual.click();
  // previous re-focuses the button, giving the new text
  await virtual.previous();
  await expect(await virtual.lastSpokenPhrase()).toEqual(`button, count is ${args.count + 1}`);
  // Changing `args.count` here changes `args` for all subsequent test methods
  args.count++;

  await virtual.stop();
}

/**
 * Uses the hacky-helper `findTabbable`, which navigates through a container to find all tabbable nodes,
 *  and then asserts that the order is correct.
 */
export const testTabOrder = async (elements, args) => {
  // Start up the Virtual Screen Reader, giving it the container _INSIDE THE SHADOW DOM_
  await virtual.start({ container: elements.container });
  const nodes = await findTabbable(virtual);
  expect(nodes.length).toEqual(3);
  expect(nodes[0]).toEqual(elements.viteLink);
  expect(nodes[1]).toEqual(elements.litLink);
  expect(nodes[2]).toEqual(elements.button);
  await virtual.stop();
}
