import { useRouter } from "next/dist/client/router";
import Link, { LinkProps } from "next/link";
import React, {
  Children,
  cloneElement,
  FC,
  PropsWithChildren,
  ReactElement,
} from "react";
import cx from "classnames";

const NavLink: FC<PropsWithChildren<LinkProps> & { activeClassName?: string }> =
  ({ children, activeClassName = "active", ...props }) => {
    const { asPath } = useRouter();

    const child = Children.only(children) as ReactElement;

    const childClassName = child.props.className || "";

    const isActive = asPath === props.href || asPath === props.as;

    const className = cx(childClassName, { [activeClassName]: isActive });

    return (
      <Link {...props}>
        {cloneElement(child, {
          className: className || null,
        })}
      </Link>
    );
  };

export default NavLink;
