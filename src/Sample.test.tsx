import { render, screen, within } from "@testing-library/react";
import Sample from "./Sample";

describe("Post Component", () => {
  it("renders with no likes", () => {
    render(<Sample content={"it's good"} user={"Noman"} />);
    // screen.debug();
    const postContainer = screen.getByTestId("post-container");
    expect(postContainer).toBeInTheDocument();

    const user = screen.getByRole("heading");
    expect(user).toBeInTheDocument();
    expect(user).toHaveTextContent("Noman");

    const para = screen.getByRole("paragraph");
    expect(para).toBeInTheDocument();
    expect(para).toHaveTextContent("it's good");

    const likes = screen.queryByRole("list");
    expect(likes).not.toBeInTheDocument();
  });

  it("renders with likes", () => {
    render(
      <Sample
        content={"it's good"}
        user={"Noman"}
        likesBy={["Noman", "Aman", "etcs"]}
      />
    );
    const likesScreen = screen.getByTestId("likes-container");

    // expect(likesScreen).toBeInTheDocument();

    const likes = within(likesScreen).getAllByRole("listitem");
    expect(likes).toHaveLength(3);
    expect(likes[0]).toHaveTextContent("Noman");
    expect(likes[1]).toHaveTextContent("Aman");
    expect(likes[2]).toHaveTextContent("etcs");
  });
});
