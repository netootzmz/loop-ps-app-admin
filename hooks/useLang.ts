import es from "./../lang/es.json";
import en from "./../lang/en.json";
import { useEffect, useState } from "react";
import { langs } from "../@types/lang";

const useLang = (lang: langs = "es") => {
  const langs = {
    es,
    en,
  };

  const [translation, setTranslation] = useState(langs[lang]);

  useEffect(() => {
    setTranslation(langs[lang]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return translation;
};

export default useLang;
