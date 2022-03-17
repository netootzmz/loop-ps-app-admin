import React, { FC } from "react";
import Aside from "./Aside";
import Header from "./Header";

const Main: FC = ({ children }) => {
  return (
    <>
      <Aside />
      <Header />
      <main className="main">{children}</main>
    </>
  );
};

export default Main;
