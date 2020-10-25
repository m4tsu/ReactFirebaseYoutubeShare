import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { VideoCard } from "components/Pages/VideoCard";
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

describe("<VideoCard>", () => {
  it("videoのコメントが表示される", () => {
    const { container } = renderWithRouter(<VideoCard video={video} />);

    const p = container.querySelector("p");
    expect(p).toHaveTextContent("testComment");
  });
  it("videoの更新日時が表示される", () => {
    const { container } = renderWithRouter(<VideoCard video={video} />);

    const time = container.querySelector("time");
    expect(time).toHaveTextContent("2019/12/10");
  });
});
