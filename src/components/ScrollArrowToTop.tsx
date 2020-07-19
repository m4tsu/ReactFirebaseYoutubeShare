import React, { FC } from "react";
import styled from "styled-components";
import { Button } from "semantic-ui-react";

const ScrollButton = styled(Button)`
  position: fixed;
  right: 20px;
  bottom: 20px;
  @media (min-width: 768px) {
    display: none !important;
  }
`;

export const ScrollArrowToTop: FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <ScrollButton icon="arrow up" circular onClick={scrollToTop} color="teal" />
  );
};
