import type { Meta, StoryObj } from '@storybook/react';
import { AppButton } from '@b1dx/ui';

const meta: Meta<typeof AppButton> = {
  title: 'UI/AppButton',
  component: AppButton,
  args: {
    children: 'Button'
  }
};

export default meta;

type Story = StoryObj<typeof AppButton>;

export const Primary: Story = {
  args: {
    variant: 'default',
    size: 'default'
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'default'
  }
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    size: 'default'
  }
};
