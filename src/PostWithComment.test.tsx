import { act, render, screen, within } from "@testing-library/react";

import PostWithComment, { type Comment } from "./PostWithComment";

import axios from "axios";

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

describe("Post with Comment", () => {
  // describe("User interaction", () => {
  const someComments: Comment[] = [
    {
      content: "Cool1",
    },
    {
      content: "Cool2",
    },
  ];
  const someId = "123";

  //   beforeEach(() => {
  //     render(<PostWithComment content={someDesc} user={someName} id="123" />);
  //   });
  //   test("user can enter", async () => {
  //     const user = userEvent.setup();
  //     const commentInput = screen.getByTestId("comment-input");
  //     const commentContent = "You are awesome!";
  //     await user.type(commentInput, commentContent);

  //     expect(commentInput).toHaveValue(commentContent);
  //   });

  //   test("Comment is cleared", async () => {
  //     const user = userEvent.setup();
  //     const commentInput = screen.getByTestId("comment-input");
  //     const commentContent = "You are awesome!";
  //     await user.type(commentInput, commentContent);
  //     const btn = screen.getByRole("button");
  //     await user.click(btn);
  //     expect(commentInput).toBeEmptyDOMElement();
  //   });
  //   test("Comment is added on screen", async () => {
  //     const user = userEvent.setup();
  //     const commentInput = screen.getByTestId("comment-input");
  //     const commentContent = "You are awesome!";
  //     await user.type(commentInput, commentContent);

  //     const commentButton = screen.getByRole("button");
  //     await user.click(commentButton);

  //     const commentsContainer = screen.getByTestId("post-comment-container");
  //     const comments = within(commentsContainer).getAllByRole("paragraph");
  //     expect(comments.length).toBe(1);
  //     expect(comments[0]).toHaveTextContent(commentContent);
  //   });

  //   test("Comment is added on screen", async () => {
  //     const user = userEvent.setup();
  //     const commentInput = screen.getByTestId("comment-input");
  //     const commentContent = "You are awesome!";
  //     await user.type(commentInput, commentContent);
  //     const comment1 = "You are awesome!";
  //     const comment2 = "Nice car!";

  //     const commentButton = screen.getByRole("button");
  //     await user.type(commentInput, comment1);
  //     await user.click(commentButton);

  //     await user.type(commentInput, comment2);
  //     await user.click(commentButton);

  //     const commentsContainer = screen.getByTestId("post-comment-container");
  //     const comments = within(commentsContainer).getAllByRole("paragraph");
  //     expect(comments.length).toBe(2);
  //     expect(comments[0]).toHaveTextContent(comment1);
  //     expect(comments[1]).toHaveTextContent(comment2);
  //   });
  // });
  describe("Post with mocks", () => {
    // it("mock the call", async () => {
    //   const getCommentsForPostSpy = vi.spyOn(Dataservice, "getCommentsForPost");
    //   getCommentsForPostSpy.mockResolvedValueOnce([
    //     {
    //       content: "Cool1",
    //     },
    //     {
    //       content: "Cool2",
    //     },
    //   ]);
    //   await act(async () => {
    //     render(<PostWithComment content="Hello" id="123" user="Alex" />);
    //   });

    //   const commentsContainer = screen.getByTestId("post-comment-container");
    //   const comments = within(commentsContainer).getAllByRole("paragraph");
    //   expect(comments.length).toBe(2);
    //   expect(comments[0]).toHaveTextContent("Cool1");
    //   expect(comments[1]).toHaveTextContent("Cool2");
    //   expect(getCommentsForPostSpy).toHaveBeenCalledTimes(1);
    //   expect(getCommentsForPostSpy).toHaveBeenCalledWith("123");
    // });
    it("mock axios api call", async () => {
      const mockAxiosSpy = vi.spyOn(axios, "get");
      mockAxiosSpy.mockResolvedValueOnce({
        data: someComments,
      });
      await act(async () => {
        render(<PostWithComment content="Hello" id="123" user="Alex" />);
      });

      const commentsContainer = screen.getByTestId("post-comment-container");
      const comments = within(commentsContainer).getAllByRole("paragraph");
      expect(comments.length).toBe(2);
      expect(comments[0]).toHaveTextContent("Cool1");
      expect(comments[1]).toHaveTextContent("Cool2");
      expect(mockAxiosSpy).toHaveBeenCalledTimes(1);
      const axiosGetSpyArgs = mockAxiosSpy.mock.calls;
      console.log(axiosGetSpyArgs);
      const axiosGetSpyCallUrl = mockAxiosSpy.mock.calls[0][0];
      expect(axiosGetSpyCallUrl.endsWith(someId)).toBe(true);
      // easier:
      const axiosGetSpyCallId = mockAxiosSpy.mock.calls[0][1]?.params.id;
      expect(axiosGetSpyCallId).toBe("123");
    });
    it("Network call throws error", async () => {
      const axiosGetSpy = vi.spyOn(axios, "get");
      axiosGetSpy.mockRejectedValueOnce(new Error("Backend error"));

      await act(async () => {
        render(
          <PostWithComment
            user={"someUserName"}
            content={"someContent"}
            id={someId}
          />
        );
      });
      const errorLabel = screen.getByTestId("error-label");
      expect(errorLabel).not.toBeEmptyDOMElement();
    });
  });
});
