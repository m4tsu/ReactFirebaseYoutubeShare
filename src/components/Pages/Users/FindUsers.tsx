import React, { FC, useContext, useState } from "react";
import { FirebaseContext } from "context";
import { findOtherUser } from "hooks/findOtherUser";
import { Form, Divider } from "semantic-ui-react";
import { AppUser } from "types/AppUser";
import styled from "styled-components";
import { UsersList } from "../UsersList";

const Label = styled.label`
  display: block;
  margin-bottom: 1em;
`;

export const FindUsers: FC = () => {
  const { db } = useContext(FirebaseContext);
  const [displayName, setDisplayName] = useState<string>("");
  const [resultUsers, setResultUsers] = useState<AppUser[]>([]);
  const [noUser, setNoUser] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };

  const handleSubmit = async () => {
    if (displayName) {
      const users = await findOtherUser({ db, displayName });
      if (users.length === 0) {
        setNoUser(true);
      } else {
        setNoUser(false);
      }
      setResultUsers(users);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Label>Twitterの名前で探す</Label>
        <Form.Group>
          <Form.Input name="displayName" onChange={handleChange} />
          <Form.Button color="twitter">探す</Form.Button>
        </Form.Group>
      </Form>
      <Divider />
      {noUser && <p>見つかりません</p>}
      <UsersList users={resultUsers} />
    </>
  );
};
