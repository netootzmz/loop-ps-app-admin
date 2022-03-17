import { langs, iErrorsMessages } from "../@types/lang";

const manageErrorsMessages = async (err: string, lang: langs) => {
  const { default: errorMsg } = (await import(
    `./../lang/${lang}ErrorsMessages.ts`
  )) as { default: iErrorsMessages };

  return errorMsg(err);
};

export default manageErrorsMessages;
