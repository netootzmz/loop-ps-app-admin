import Link from "next/link";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  iAuthState,
  iGlobalState,
  iUiState,
} from "../../../@types/store/states";
import svgs from "../../../helpers/svgs";
import { startLogout } from "../../../store/actions/authActions";
import SvgWrapper from "../../SvgWrapper";
import useLang from "../../../hooks/useLang";
import { CSSTransition } from "react-transition-group";
import { toogleMenu } from "../../../store/actions/uiActions";

const Dropdown: FC = ({ children }) => {
  const { nombre, lang, menu } = useSelector<
    iGlobalState,
    iAuthState & iUiState
  >(({ auth, ui }) => ({ ...auth, ...ui }));
  const dispatch = useDispatch();

  const { user_menu } = useLang(lang);

  const handleLogout = () => {
    dispatch(startLogout());
    dispatch(toogleMenu());
  };

  const handleToogleMenu = () => {
    dispatch(toogleMenu());
  };

  return (
    <div className="dropdown header__menu">
      <label
        htmlFor="dropdown-toogle"
        className="dropdown__button"
        onClick={handleToogleMenu}
      >
        {children}
        <CSSTransition
          in={menu}
          classNames={{
            enter: "animate__animated animate__fadeIn",
            exit: "animate__animated animate__fadeOut",
          }}
          unmountOnExit
          timeout={200}
        >
          <div className="dropdown__background">&nbsp;</div>
        </CSSTransition>
      </label>
      <CSSTransition
        in={menu}
        classNames={{
          enter: "animate__animated animate__fadeIn",
          exit: "animate__animated animate__fadeOutUpBig",
        }}
        unmountOnExit
        timeout={{
          enter: 250,
          exit: 200,
        }}
      >
        <div className="dropdown__container">
          <ul className="dropdown__menu">
            <li className="dropdown__item">{nombre}</li>
            <li className="dropdown__item" onClick={handleToogleMenu}>
              <Link href="/account/password">
                <a className="link link--dropdown">
                  <SvgWrapper id={svgs.person} className="svg svg--small" />
                  <span>{user_menu.account}</span>
                </a>
              </Link>
            </li>
            <li className="dropdown__item">Smart Payment Services</li>
            <li className="dropdown__item" onClick={handleToogleMenu}>
              <Link href="/profile/preferences">
                <a className="link link--dropdown">
                  <SvgWrapper
                    id={svgs.settingsStar}
                    className="svg svg--small"
                  />
                  <span>{user_menu.system}</span>
                </a>
              </Link>
            </li>
            <li className="dropdown__item">
              <button
                className="btn btn--dropdown btn--icon"
                type="button"
                onClick={handleLogout}
              >
                <SvgWrapper id={svgs.logout} className="svg svg--small" />
                <span>{user_menu.logout}</span>
              </button>
            </li>
          </ul>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Dropdown;
