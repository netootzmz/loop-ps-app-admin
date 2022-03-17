import React, { FC } from "react";
import Image from "next/image";
import logo from "./../../public/logo-smart.png";
import es from "./../../public/spanish.png";
import en from "./../../public/english.png";
import { langs } from "../../@types/lang";
import { useDispatch } from "react-redux";
import { setLanguage } from "../../store/actions/uiActions";

const AuthCard: FC<{ title: string }> = ({ children, title }) => {
  const dispatch = useDispatch();

  const handleLang = (lang: langs) => {
    dispatch(setLanguage(lang));
  };

  return (
    <main className="auth">
      <section className="auth__card animate__animated animate__jackInTheBox animate__fast">
        <div className="auth__langs">
          <button className="btn btn--lang btn--icon" title="Español">
            <Image
              src={es}
              alt="lenguaje español"
              onClick={() => handleLang("es")}
            />
          </button>
          <button className="btn btn--lang btn--icon" title="English">
            <Image
              src={en}
              alt="language english"
              onClick={() => handleLang("en")}
            />
          </button>
        </div>
        <picture className="auth__logo">
          <Image src={logo} alt="Smart Payment Services SA de CV" />
        </picture>
        <h2 className="h1">{title}</h2>
        {children}
      </section>
    </main>
  );
};

export default AuthCard;
