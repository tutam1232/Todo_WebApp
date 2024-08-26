import { render, screen } from "@testing-library/react";
import App from ".";

test("renders login", () => {
  const container = document.createElement("div");
  container.id = "root";

  render(<App />, { container: document.body.appendChild(container) });
  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});
