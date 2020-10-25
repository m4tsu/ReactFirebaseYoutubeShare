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
  const [screenName, setScreenName] = useState<string>("");
  const [resultUsers, setResultUsers] = useState<AppUser[]>([]);
  const [noUser, setNoUser] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScreenName(e.target.value);
  };

  const handleSubmit = async () => {
    if (screenName) {
      const users = await findOtherUser({ db, screenName });
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
        <Label>TwitterのIDで探す</Label>
        <Form.Group>
          <Form.Input name="screenName" onChange={handleChange} />
          <Form.Button color="twitter">探す</Form.Button>
        </Form.Group>
      </Form>
      <Divider />
      {noUser && <p>見つかりません</p>}
      <UsersList users={resultUsers} />
    </>
  );
};
