import { userEvent, within } from '@storybook/test';

/**
 * Extract elements from an HTMLElement
 */
export const getElements = async (canvasElement) => {
  const screen = within(canvasElement);

  return { 
    screen,
    button: await screen.queryByRole('button'),
  };
}
