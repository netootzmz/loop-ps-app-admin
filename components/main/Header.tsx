import React, { FC } from "react";
import { useSelector } from "react-redux";
import svgs from "../../helpers/svgs";
import { iGlobalState, iUiState } from "../../@types/store/states";
import SvgWrapper from "../SvgWrapper";
import User from "./user";
import Dropdown from "./user/Dropdown";
import { useRouter } from "next/router";

const Header: FC = () => {
  const { title } = useSelector<iGlobalState, iUiState>(({ ui }) => ui);
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };
  return (
    <header className="header">
      {router.pathname !== "/" ? (
        <button
          className="btn btn--back btn--icon"
          type="button"
          onClick={handleClick}
        >
          <SvgWrapper id={svgs.arrLeft} className="svg svg--small" />
        </button>
      ) : (
        <></>
      )}
      <h5 className="h5">{title}</h5>
      <Dropdown>
        <User />
      </Dropdown>
    </header>
  );
};

export default Header;
