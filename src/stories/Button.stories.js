import { Button } from './Button';
import { getElements, ensureElementsStep, mouseInteractionStep, keyboardInteractionStep } from './Button.shared-spec';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Example/Button',
  tags: ['autodocs'],
  render: (args) => Button(args),
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: { action: 'onClick' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  args: {
    primary: true,
    label: 'Primary',
  },
  play: async ({ args, canvasElement, step }) => {
    const elements = await getElements(canvasElement);
    await ensureElementsStep(elements, args, step);
    await mouseInteractionStep(elements, args, step);
    await keyboardInteractionStep(elements, args, step);
  },
};

export const Secondary = {
  args: {
    label: 'Button',
  },
  play: Primary.play,
};

export const Large = {
  args: {
    size: 'large',
    label: 'Button',
  },
  play: Primary.play,
};

export const Small = {
  args: {
    size: 'small',
    label: 'Button',
  },
  play: Primary.play,
};
