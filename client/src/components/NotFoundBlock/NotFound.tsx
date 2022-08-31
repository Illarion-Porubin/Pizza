import React, { FC } from "react";
import s from "./NotFoundBlock.module.scss"

console.log(s)

export const NotFound: FC = () => {
  return (
      <h1 className={s.notFound}>
        <span>😕</span> 
        <br />
        Ничего не найдено
      </h1>
  );
};
