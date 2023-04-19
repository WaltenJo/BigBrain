import React from 'react';
import { render, screen } from '@testing-library/react';

describe('AuthTest', () => {
  it('renders a login button', () => {
    expect(screen.getByRole('button')).toBeInTheDocument();
  })
})
