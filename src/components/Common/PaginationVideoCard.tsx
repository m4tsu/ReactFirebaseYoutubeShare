import styled from "styled-components";
import { Segment, Button } from "semantic-ui-react";

export const PaginationVideoCard = styled(Segment)`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  text-align: left;
  transition-duration: 0.3s;

  :hover {
    box-shadow: 0 2px 8px #bbb;
  }
`;

export const PaginationVideoCardBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

export const TagButton = styled(Button)`
  margin-bottom: 0 !important;
  margin-right: 0.5em !important;
  padding: 0.5em 1.2em !important;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1em;
  width: 100%;
`;
