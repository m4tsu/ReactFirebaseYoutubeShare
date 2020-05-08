import React, { FC } from "react";
import { AppUser } from "types/AppUser";

type TimeLineProps = {
  currentUser: AppUser;
};

export const TimeLine: FC<TimeLineProps> = ({ currentUser }) => {
  return <p>timeline</p>;
};
