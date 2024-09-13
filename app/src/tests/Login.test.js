import { render, screen } from '@testing-library/react';
import Login from '../components/Login/Login';

test('testa se existe o texto Login', () => {
  render(<Login />);
  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});
