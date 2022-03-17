import React, { FC } from "react";
import { iSvg } from "../@types/components";

const SvgWrapper: FC<iSvg> = ({ className, id }) => {
  return (
    <svg className={className}>
      <use xlinkHref={`/sprite.svg#icon-${id}`} />
    </svg>
  );
};

export default SvgWrapper;
