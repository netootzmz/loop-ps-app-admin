import React, { FC } from "react";
import { iLink } from "../../@types/components";
import NavLink from "../NavLink";
import SvgWrapper from "../SvgWrapper";

const SideMenu: FC<{ title: string; links: Array<iLink> }> = ({
  children,
  title,
  links,
}) => {
  return (
    <section className="side-menu__container">
      <nav className="side-menu">
        <h4 className="h4 animate__animated animate__fadeIn">
          <b>{title}</b>
        </h4>
        {links.map((link) => (
          <NavLink
            href={link.route}
            key={link.route}
            activeClassName="menulink--active"
          >
            <a className="menulink animate__animated animate__fadeInLeft">
              <div className="menulink__container">
                <SvgWrapper id={link.svgId} className="svg svg--small" />
                <span className="menulink__text">{link.text}</span>
              </div>
            </a>
          </NavLink>
        ))}
      </nav>
      {children}
    </section>
  );
};

export default SideMenu;
