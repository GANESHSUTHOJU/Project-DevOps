import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Simple Web Application/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders user form', () => {
  render(<App />);
  const formElement = screen.getByText(/Add New User/i);
  expect(formElement).toBeInTheDocument();
});

test('renders user list', () => {
  render(<App />);
  const listElement = screen.getByText(/Users/i);
  expect(listElement).toBeInTheDocument();
});
