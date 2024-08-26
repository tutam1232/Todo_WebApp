import { render, screen } from '@testing-library/react';
import App from '.';

test('renders login', () => {
  render(<App />);
  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});