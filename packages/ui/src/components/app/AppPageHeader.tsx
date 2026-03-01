import * as React from 'react';
import { Section } from './Section';

export interface AppPageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export const AppPageHeader = ({ title, description, actions }: AppPageHeaderProps) => (
  <Section variant="flush" title={title} description={description} actions={actions} />
);
