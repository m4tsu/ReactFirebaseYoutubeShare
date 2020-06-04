import styled from "styled-components";
import { Image } from "semantic-ui-react";

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;

  div {
    padding-top: 1em;
  }
`;

export const CenteredImage = styled(Image)`
  margin: 0 auto;
`;
