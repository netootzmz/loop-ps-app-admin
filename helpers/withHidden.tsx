import { useRouter } from "next/router";
import React, { useEffect } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { iGlobalState, iAuthState, iUiState } from "../@types/store/states";
import { startRenew } from "../store/actions/authActions";
import { NextPage } from "next";

const withHidden = (WrappedComponent: NextPage<any>) => {
  return (props: any) => {
    const Router = useRouter();
    const dispatch = useDispatch();

    const { usrId, lang } = useSelector<iGlobalState, iAuthState & iUiState>(
      ({ auth, ui }) => ({ ...auth, ...ui })
    );

    useEffect(() => {
      const token = localStorage.getItem("x-token");
      const initDate = localStorage.getItem("init-date");
      const lastPath = localStorage.getItem("last-path");
      if (
        token &&
        initDate &&
        moment().isAfter(moment(initDate).add(60, "minutes"))
      ) {
        localStorage.clear();
      }
      if (
        token &&
        !usrId &&
        initDate &&
        moment().isBefore(moment(initDate).add(60, "minutes"))
      )
        dispatch(startRenew(lang));

      if (usrId) {
        Router.replace(lastPath || " /");
      }
    }, [usrId, dispatch, Router, lang]);

    if (!usrId) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default withHidden;
