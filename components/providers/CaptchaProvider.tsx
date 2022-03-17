import React, { FC, ReactNode } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const CaptchaProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6Lda1IIbAAAAANsMtlDWN3c3CxN3ovIl8kI3mZit">
      {children}
    </GoogleReCaptchaProvider>
  );
};

export default CaptchaProvider;
