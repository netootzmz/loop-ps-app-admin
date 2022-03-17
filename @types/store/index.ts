import { NextPage } from "next";
import { Action } from "redux";
import { DispatchProp } from "react-redux";
import { iGlobalState } from "./states";
import { FC } from "react";

export interface iAction<P = any> extends Action<string> {
  payload?: P;
}

export interface iReducer<S, P = S> {
  (state: S, action: iAction<P>): S;
}

export type PageWithStore<Props = {}> = NextPage<
  DispatchProp<any> & iGlobalState & Props
>;

export type ComponentWithStore<Props = {}> = FC<
  DispatchProp<any> & iGlobalState & Props
>;
