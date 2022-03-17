/* eslint-disable react/display-name */
import { useEffect } from "react";
// import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { iGlobalState, iAuthState, iUiState } from "../@types/store/states";
import { startRenew } from "../store/actions/authActions";
import { NextPage } from "next";

let sessionTime: any;

const withAuth = (WrappedComponent: NextPage<any>) => (props: any) => {
  const dispatch = useDispatch();
  const { lang } = useSelector<iGlobalState, iAuthState & iUiState>(
    ({ auth, ui }) => ({ ...auth, ...ui })
  );
  const resetTimer = () => {
    // console.log("reset time session", moment().format("h:mm:ss a"));
    if (sessionTime) clearTimeout(sessionTime);
    sessionTime = setTimeout(logout, 5 * 60 * 1000);
  };

  const logout = () => {
    // console.info("logout", moment().format("h:mm:ss a"));
    localStorage.clear();
    setTimeout(() => {
      window.location.replace("/auth/login/expired");
    }, 1000);
  };

  const inactivityTime = () => {
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;
    document.onscroll = resetTimer;
    document.onclick = resetTimer;
  };
  useEffect(() => {
    resetTimer();
    inactivityTime();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("x-token");
    if (!token) window.location.replace("/auth/login");
    dispatch(startRenew(lang));
  }, [dispatch, lang]);

  return <WrappedComponent {...props} />;
};

export default withAuth;
