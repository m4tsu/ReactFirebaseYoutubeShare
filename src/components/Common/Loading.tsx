import React, { FC } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

export const Loading: FC = () => {
  return (
    <Dimmer active inverted>
      <Loader inverted />
    </Dimmer>
  );
};
