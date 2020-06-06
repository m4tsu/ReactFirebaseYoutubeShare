import React, { useState, createContext, FC } from "react";
import { Message } from "semantic-ui-react";

type ErrorContextValue = {
  hasError: boolean;
  error: null | Error;
  setContextError: (err: Error) => void;
  setContextErrorDone: () => void;
};

export const ErrorContext = createContext<ErrorContextValue>(
  (null as unknown) as ErrorContextValue
);

export const ErrorProvider: React.FC<object> = (props) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const setContextError = (err: Error) => {
    setError(err);
    setHasError(true);
  };

  const setContextErrorDone = () => {
    setError(null);
    setHasError(false);
  };

  if (hasError) {
    return (
      <Message negative>
        通信エラーが発生しました。ページを再度読み込んでください。
      </Message>
    );
  }

  return (
    <ErrorContext.Provider
      value={{
        hasError,
        // userMessage,
        error,
        setContextError,
        setContextErrorDone,
      }}
      {...props}
    />
  );
};
