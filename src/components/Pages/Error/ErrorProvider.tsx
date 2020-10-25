import React, { createContext, FC, useState } from "react";

type ErrorContextValue = {
  hasError: boolean;
  error: null | Error;
  setContextError: (err: Error) => void;
  setContextErrorDone: () => void;
};

export const ErrorContext = createContext<ErrorContextValue>(
  (null as unknown) as ErrorContextValue
);

export const ErrorProvider: FC = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const setContextError = (err: Error) => {
    setError(err);
    setHasError(true);
  };

  const setContextErrorDone = () => {
    setError(null);
    setHasError(false);
  };

  return (
    <ErrorContext.Provider
      value={{ hasError, error, setContextError, setContextErrorDone }}
    >
      {children}
    </ErrorContext.Provider>
  );
};
