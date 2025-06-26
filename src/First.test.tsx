import { render, screen } from "@testing-library/react";
import First from "./First";

describe("First test", () => {
  it("renders without crashing", () => {
    render(<First />);
    expect(true).toBeTruthy();

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });
});
