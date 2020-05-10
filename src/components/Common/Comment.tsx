import styled from "styled-components";

export const Comment = styled.p`
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const VideoCardComment = styled.div`
  text-align: left !important;

  p {
    overflow: hidden;
    text-align: left !important;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span {
    font-size: 0.9rem;
    margin-top: 5rem;
    text-align: left !important;
  }
`;
