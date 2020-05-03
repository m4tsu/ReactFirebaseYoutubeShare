import styled from "styled-components";
import { Button } from "semantic-ui-react";

export const ButtonMain = styled(Button)`
  background-color: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.white};
`;
