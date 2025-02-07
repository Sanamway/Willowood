import React, { useState } from "react";
import SalesLogin from "./SalesLogin";
import Login from "./OTPLogin";
import ForgetPassForm from "./ForgetPassForm";
const FormContainer = () => {
  const [loginForm, setLoginForm] = useState("emplogin");
  return (
    <>
      <section>
        {loginForm === "emplogin" && <SalesLogin loginForm={setLoginForm} />}
        {loginForm === "otplogin" && <Login loginForm={setLoginForm} />}
        {loginForm === "forgot" && <ForgetPassForm loginForm={setLoginForm} />}
      </section>
    </>
  );
};

export default FormContainer;
