import { act, render, screen, within } from "@testing-library/react";

import * as Dataservice from "./DataService";
import PostWithComment from "./PostWithComment";
import userEvent from "@testing-library/user-event";
const now = new Date().getTime();

// vi.mock("./assets/DataService", () => ({
//   getCommentsForPost: () => {
//     console.log("Calling getCommentsForPost mock");
//     return [
//       {
//         content: "Cool1",
//       },
//       {
//         content: "Cool2",
//       },
//     ];
//   },
// }));

// describe("Post with Comment", () => {
//   // describe("User interaction", () => {
//   // const someComments: Comment[] = [
//   //   {
//   //     content: "Cool1",
//   //     date: now,
//   //   },
//   //   {
//   //     content: "Cool2",
//   //     date: now + 1000,
//   //   },
//   // ];
//   // const someId = "123";
//   // const server = setupServer(
//   //   http.get("http://localhost:4000/comments/*", () => {
//   //     return HttpResponse.json(someComments);
//   //   })
//   // );
//   // beforeAll(() => server.listen());
//   // afterAll(() => server.close());
//   // afterAll(() => server.resetHandlers());
//   //   beforeEach(() => {
//   //     render(<PostWithComment content={someDesc} user={someName} id="123" />);
//   //   });
//   //   test("user can enter", async () => {
//   //     const user = userEvent.setup();
//   //     const commentInput = screen.getByTestId("comment-input");
//   //     const commentContent = "You are awesome!";
//   //     await user.type(commentInput, commentContent);
//   //     expect(commentInput).toHaveValue(commentContent);
//   //   });
//   //   test("Comment is cleared", async () => {
//   //     const user = userEvent.setup();
//   //     const commentInput = screen.getByTestId("comment-input");
//   //     const commentContent = "You are awesome!";
//   //     await user.type(commentInput, commentContent);
//   //     const btn = screen.getByRole("button");
//   //     await user.click(btn);
//   //     expect(commentInput).toBeEmptyDOMElement();
//   //   });
//   //   test("Comment is added on screen", async () => {
//   //     const user = userEvent.setup();
//   //     const commentInput = screen.getByTestId("comment-input");
//   //     const commentContent = "You are awesome!";
//   //     await user.type(commentInput, commentContent);
//   //     const commentButton = screen.getByRole("button");
//   //     await user.click(commentButton);
//   //     const commentsContainer = screen.getByTestId("post-comment-container");
//   //     const comments = within(commentsContainer).getAllByRole("paragraph");
//   //     expect(comments.length).toBe(1);
//   //     expect(comments[0]).toHaveTextContent(commentContent);
//   //   });
//   //   test("Comment is added on screen", async () => {
//   //     const user = userEvent.setup();
//   //     const commentInput = screen.getByTestId("comment-input");
//   //     const commentContent = "You are awesome!";
//   //     await user.type(commentInput, commentContent);
//   //     const comment1 = "You are awesome!";
//   //     const comment2 = "Nice car!";
//   //     const commentButton = screen.getByRole("button");
//   //     await user.type(commentInput, comment1);
//   //     await user.click(commentButton);
//   //     await user.type(commentInput, comment2);
//   //     await user.click(commentButton);
//   //     const commentsContainer = screen.getByTestId("post-comment-container");
//   //     const comments = within(commentsContainer).getAllByRole("paragraph");
//   //     expect(comments.length).toBe(2);
//   //     expect(comments[0]).toHaveTextContent(comment1);
//   //     expect(comments[1]).toHaveTextContent(comment2);
//   //   });
//   // });
// });

describe("Post with mocks", () => {
  afterEach(() => {
    vi.useRealTimers();
  });
  it("mock the call", async () => {
    const getCommentsForPostSpy = vi.spyOn(Dataservice, "getCommentsForPost");

    getCommentsForPostSpy.mockResolvedValueOnce([
      {
        content: "Cool1",
        date: now,
      },
      {
        content: "Cool2",
        date: now + 2000,
      },
    ]);
    await act(async () => {
      render(<PostWithComment content="Hello" id="123" user="Alex" />);
    });

    const commentsContainer = screen.getByTestId("post-comment-container");
    const comments = within(commentsContainer).getAllByRole("paragraph");
    expect(comments.length).toBe(2);
    expect(comments[0]).toHaveTextContent("Cool2");
    expect(comments[1]).toHaveTextContent("Cool1");
    expect(getCommentsForPostSpy).toHaveBeenCalledTimes(1);
    expect(getCommentsForPostSpy).toHaveBeenCalledWith("123");
  });

  it("", async () => {
    const postCommentSpy = vi.spyOn(Dataservice, "postComment");
    const dateNowNumber = 1600000000000;

    vi.setSystemTime(1600000000000);
    await act(async () => {
      render(<PostWithComment content="Hello" id="123" user="Alex" />);
    });

    const user = userEvent.setup();
    const commentInput = screen.getByTestId("comment-input");
    const commentContent = "You are awesome!";
    await user.type(commentInput, commentContent);

    const commentButton = screen.getByRole("button");
    await user.click(commentButton);

    expect(postCommentSpy).toHaveBeenCalledTimes(1);
    expect(postCommentSpy).toHaveBeenCalledWith(
      "123",
      commentContent,
      dateNowNumber
    );
  });
});
