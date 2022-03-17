import Link from "next/link";
import React, { FC } from "react";
import SvgWrapper from "../SvgWrapper";
import svgs from "../../helpers/svgs";
import NavLink from "../NavLink";

const Aside: FC = () => {
  return (
    <aside className="aside">
      <Link href="/">
        <a className="link link--logo">
          <SvgWrapper id={svgs.logo} className="svg svg--big" />
        </a>
      </Link>
      <nav className="aside__nav">
        <NavLink href="/payments/generate" activeClassName="navlink--active">
          <a className="navlink">
            <SvgWrapper id={svgs.plane} className="svg svg--small" />
          </a>
        </NavLink>
        <NavLink href="/reports/transactions" activeClassName="navlink--active">
          <a className="navlink">
            <SvgWrapper id={svgs.graph} className="svg svg--small" />
          </a>
        </NavLink>
        {/* <NavLink href="/monetaryAdjustment" activeClassName="navlink--active">
          <a className="navlink">
            <SvgWrapper id={svgs.monetary} className="svg svg--small" />
          </a>
        </NavLink> */}
        {/* <NavLink href="/commerce/general" activeClassName="navlink--active">
          <a className="navlink">
            <SvgWrapper id={svgs.reduce} className="svg svg--small" />
          </a>
        </NavLink> */}
        <NavLink href="/conciliation" activeClassName="navlink--active">
          <a className="navlink">
            <SvgWrapper id={svgs.conciliation} className="svg svg--small" />
          </a>
        </NavLink>
        {/* <NavLink href="/dispersion" activeClassName="navlink--active">
          <a className="navlink">
            <SvgWrapper id={svgs.dispersion} className="svg svg--small" />
          </a>
        </NavLink> */}
      </nav>
    </aside>
  );
};

export default Aside;
