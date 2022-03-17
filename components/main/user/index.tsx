import React from "react";
import "moment/locale/es";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { iAuthState, iGlobalState } from "../../../@types/store/states";

const User = () => {
  const { nombre, perfilRol, group_description, client } = useSelector<
    iGlobalState,
    iAuthState
  >(({ auth }) => auth);

  const getTwoNames = nombre?.split(" ").slice(0, 2).join(" ");

  const getInitials = nombre
    ?.split(" ")
    .slice(0, 2)
    .join(" ")
    .split(" ")
    .map((i) => i.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <div className="user">
      <div className="user__text">
        <span className="user__name">{getTwoNames}</span>
        <span>{perfilRol}</span>
        <span className="user__reason">
          <b>{group_description}</b> | {client}
        </span>
      </div>
      <figure className="user__img">
        <span className="user__initials">{getInitials}</span>
      </figure>
      <div className="user__time">
        <span>
          <Moment format="LL" locale="es" />
        </span>
        <span className="user__hour">
          <Moment format="H:mm" />
        </span>
      </div>
    </div>
  );
};

export default User;
