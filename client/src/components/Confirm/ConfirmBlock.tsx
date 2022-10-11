import React, { FC } from "react";
import s from "./ConfirmBlock.module.scss"

export const Confirm: FC = () => {
  return (
      <h1 className={s.notFound}>
        <br />
        Подтвердите аккаунт, письмо отпралвенно вам на почту
      </h1>
  );
};
