import { Page } from './Page';
import * as HeaderStories from './Header.stories';
import { userSetState, getElements, ensureElementsStep, mouseInteractionStep, keyboardInteractionStep } from './Page.shared-spec';

export default {
  title: 'Example/Page',
  render: (args) => Page(args),
};

export const LoggedIn = {
  args: {
    // More on composing args: https://storybook.js.org/docs/writing-stories/args#args-composition
    ...HeaderStories.LoggedIn.args,
  },
  play: async ({ args, canvasElement, step }) => {
    args.userSetState = await userSetState(canvasElement);
    args.user = {
      name: 'Jane Doe',
    };
    const elements = await getElements(canvasElement);
    await ensureElementsStep(elements, args, step);
    // turned off since `onClick`s are internal to component
    // await mouseInteractionStep(elements, args, step);
    await keyboardInteractionStep(elements, args, step);
  },
};

export const LoggedOut = {
  args: {
    ...HeaderStories.LoggedOut.args,
  },
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    await ensureElementsStep(elements, args, step);
    // turned off since `onClick`s are internal to component
    // await mouseInteractionStep(elements, args, step);
    await keyboardInteractionStep(elements, args, step);
  },
};
