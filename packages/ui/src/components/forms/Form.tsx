'use client';

import React from 'react';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(({ className = '', ...props }, ref) => (
  <form ref={ref} className={className} {...props} />
));

Form.displayName = 'Form';
