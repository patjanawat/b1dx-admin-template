import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Form, FormField, Input } from '@b1dx/ui';

const meta: Meta<typeof FormField> = {
  title: 'UI/FormField',
  component: FormField,
  args: {
    label: 'Email',
    required: true
  }
};

export default meta;

type Story = StoryObj<typeof FormField>;

export const InlineError: Story = {
  render: (args) => (
    <Form>
      <FormField {...args} error="Please enter a valid email" errorMode="inline">
        <Input type="email" placeholder="name@example.com" />
      </FormField>
    </Form>
  )
};

export const TooltipError: Story = {
  render: (args) => (
    <Form>
      <FormField
        {...args}
        error="Please enter a valid email"
        errorMode="tooltip"
        touched
        submitCount={1}
      >
        <Input type="email" placeholder="name@example.com" />
      </FormField>
    </Form>
  )
};
