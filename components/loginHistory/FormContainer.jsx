import React, { useState } from "react";
import EmpLogin from "./EmpLogin";
import Login from "./Login";
import ForgetPassForm from "./ForgetPassForm";
const FormContainer = () => {
  const [loginForm, setLoginForm] = useState("emplogin");
  return (
    <>
      <section>
        {loginForm === "emplogin" && <EmpLogin loginForm={setLoginForm} />}
        {loginForm === "otplogin" && <Login loginForm={setLoginForm} />}
        {loginForm === "forgot" && <ForgetPassForm loginForm={setLoginForm} />}
      </section>
    </>
  );
};

export default FormContainer;
