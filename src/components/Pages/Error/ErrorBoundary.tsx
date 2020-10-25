import React, { FC, useContext, useEffect } from "react";
import { ErrorContext } from "components/Pages/Error/ErrorProvider";
import { Message, Container } from "semantic-ui-react";

export const ErrorBoundary: FC = ({ children }) => {
  const { hasError, error, setContextErrorDone } = useContext(ErrorContext);

  if (hasError) {
    console.log(error);

    return (
      <Container>
        <Message
          warning
          content="通信エラーが発生しました。ページを更新して再度お試しください。"
        />
      </Container>
    );
  }

  return <>{children}</>;
};
