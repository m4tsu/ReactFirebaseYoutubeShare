import styled from "styled-components";
import { Menu } from "semantic-ui-react";

export const CenteredMenu = styled(Menu)`
  text-align: center;
  width: 100% !important;

  @media (max-width: 991px) {
    margin: 0 auto !important;
  }
`;
