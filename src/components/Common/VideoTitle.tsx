import styled from "styled-components";
import { Header } from "semantic-ui-react";

export const VideoTitle = styled(Header)`
  margin: 10px 0 !important;
`;

export const VideoCardTitle = styled.h4`
  font-weight: 600;
  margin: 0 0 3px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
