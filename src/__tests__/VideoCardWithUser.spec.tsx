import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { VideoCardWithUser } from "components/Pages/VideoCardWithUser";
import { Video } from "types/Video";
import { firebase } from "FirebaseConfig";
import { renderWithRouter } from "../testUtils/renderWithRouter";

const video: Video = {
  id: "testVideDocId",
  videoId: "testVideoId",
  type: "video",
  title: "testTitle",
  comment: "testComment",
  user: {
    uid: "testuid",
    photoURL: "testphotourl",
    displayName: "testDisplayName",
  },
  tags: ["testTagA"],
  likeCount: 1,
  createdAt: firebase.firestore.Timestamp.fromDate(
    new Date("December 10, 2019")
  ),
  updatedAt: firebase.firestore.Timestamp.fromDate(
    new Date("December 10, 2019")
  ),
};

describe("<VideoCardWithUser>", () => {
  it("videoのコメントが表示される", () => {
    const { container } = renderWithRouter(<VideoCardWithUser video={video} />);

    const p = container.querySelector("p");
    expect(p).toHaveTextContent("testComment");
  });
  it("videoのuserが表示される", () => {
    const { getByText } = renderWithRouter(<VideoCardWithUser video={video} />);

    expect(getByText("testDisplayName")).toHaveAttribute(
      "href",
      "/testuid/videos"
    );
  });
});
