import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import moment from "moment";
import { iAuthState, iGlobalState } from "../@types/store/states";
import { startRenew } from "../store/actions/authActions";
import validator from "validator";

interface iuseAuthHook {
  (props?: { redirectTo?: string; redirectIfFound?: string }):
    | string
    | undefined;
}

const useAuth: iuseAuthHook = ({ redirectTo, redirectIfFound } = {}) => {
  const isMounted = useRef(true);
  const { usrId, nombre, lang} = useSelector<iGlobalState, iAuthState>(
    ({ auth }) => auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!validator.contains(Router.pathname, "/auth")) {
      localStorage.setItem("last-path", Router.pathname);
    }
    const token = localStorage.getItem("x-token");
    const initDate = localStorage.getItem("init-date");
    if (!!!usrId && redirectTo) Router.push(redirectTo);
    if (
      !!!usrId &&
      token &&
      initDate &&
      moment().isAfter(moment(initDate).add(6, "hours"))
    ) {
      Router.push("/auth/login");
      localStorage.clear();
    }
    if (
      !!!usrId &&
      token &&
      !moment().isAfter(moment(initDate).add(6, "hours"))
    )
      dispatch(startRenew(lang!));
    if (!!usrId && redirectIfFound) Router.push(redirectIfFound);
  }, [usrId, redirectIfFound, redirectTo, dispatch]);
  return nombre;
};

export default useAuth;
