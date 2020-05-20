import React, { FC, useContext, useState } from "react";
import { TagsContext, FirebaseContext } from "context";
import { AppUser } from "types/AppUser";
import { Segment, Button, ButtonProps } from "semantic-ui-react";
import styled from "styled-components";
import { DeleteTagModal } from "components/Pages/Mypage/Tag/DeleteTagModal";

const FlexSegment = styled(Segment)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TagLabel = styled.div``;

type TagsProps = {
  currentUser: AppUser;
};

export const Tags: FC<TagsProps> = ({ currentUser }) => {
  const { tags } = useContext(TagsContext);
  const { db } = useContext(FirebaseContext);
  const [openDelete, setOpenDelete] = useState(false);
  // const [openEdit, setOpenEdit] = useState(false);
  const [targetTag, setTargetTag] = useState<string>("");

  const handleClickDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => {
    console.log(data.taglabel);
    setTargetTag(data.taglabel);
    setOpenDelete(true);
  };

  return (
    <>
      <Segment.Group>
        {tags.map((tag) => {
          return (
            <FlexSegment key={tag.label}>
              <TagLabel>{tag.label}</TagLabel>
              <div>
                <Button
                  color="red"
                  circular
                  icon="trash"
                  onClick={handleClickDelete}
                  taglabel={tag.label}
                />
              </div>
            </FlexSegment>
          );
        })}
      </Segment.Group>
      <DeleteTagModal
        open={openDelete}
        setOpen={setOpenDelete}
        currentUser={currentUser}
        db={db}
        tag={targetTag}
      />
    </>
  );
};
