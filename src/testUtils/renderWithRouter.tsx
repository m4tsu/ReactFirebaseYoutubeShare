import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory, MemoryHistory } from "history";
import { render } from "@testing-library/react";

type Option = {
  history?: MemoryHistory;
};

export const renderWithRouter = (ui: React.ReactElement, option?: Option) => {
  const Wrapper: React.FC = ({ children }) => (
    <Router history={option?.history ?? createMemoryHistory()}>
      {children}
    </Router>
  );

  return { ...render(ui, { wrapper: Wrapper }) };
};
