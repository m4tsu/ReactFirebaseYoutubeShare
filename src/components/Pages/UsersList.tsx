import React, { FC } from "react";
import { AppUser } from "types/AppUser";
import { Grid, Segment, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type UsersListProps = {
  users: AppUser[];
};

const FlexSegment = styled(Segment)`
  display: flex !important;
  flex-direction: column;
  text-align: center;
`;

const CenteredImage = styled(Image)`
  margin: 1em auto;
`;

export const UsersList: FC<UsersListProps> = ({ users }) => {
  return (
    <Grid>
      {users.map((user) => (
        <Grid.Column key={user.uid} mobile={16} tablet={6} computer={6}>
          <Link to={`/${user.uid}/videos`}>
            <FlexSegment>
              <CenteredImage src={user.photoURL} />
              <p>{user.displayName}</p>
            </FlexSegment>
          </Link>
        </Grid.Column>
      ))}
    </Grid>
  );
};
