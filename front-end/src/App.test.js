import { render, screen } from "@testing-library/react";
import App from ".";

test("renders login", () => {
  const mockUpObject = {
    focus: () => null,
  };
  global.document.getElementById = jest.fn(() => mockUpObject);
  render(<App />);
  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});
