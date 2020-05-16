import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { Button, ButtonProps } from "semantic-ui-react";
import styled from "styled-components";
import { AppUser } from "types/AppUser";

const TagButton = styled(Button)`
  margin-bottom: 0.2em !important;
`;

type TagButtonsParams = {
  uid: string;
  currentUser?: AppUser;
  tags: string[];
};

export const TagButtons: FC<TagButtonsParams> = ({
  uid,
  tags,
  currentUser,
}) => {
  const history = useHistory();

  const handleTagClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => {
    console.log(currentUser);
    if (currentUser) {
      console.log("mypage!!!");
      history.push(`/mypage/videos#${data.children as string}`);
    } else {
      history.push(`/${uid}/videos#${data.children as string}`);
    }

    e.preventDefault();
  };

  return (
    <>
      {tags.map((tag) => {
        return (
          <TagButton primary size="mini" key={tag} onClick={handleTagClick}>
            {tag}
          </TagButton>
        );
      })}
    </>
  );
};
