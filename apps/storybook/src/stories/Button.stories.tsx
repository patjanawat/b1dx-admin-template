import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@b1dx/ui';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  args: {
    children: 'Button'
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

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
