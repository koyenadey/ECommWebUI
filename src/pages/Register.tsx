import { useState } from "react";

import RegisterHome from "../components/register/RegisterHome";
import RegisterForm from "../components/register/RegisterForm";

const Register = () => {
  const [isFormVisible, setFormVisible] = useState<boolean>(false);
  return (
    <>
      {!isFormVisible && <RegisterHome onViewForm={setFormVisible} />}
      {isFormVisible && <RegisterForm />}
    </>
  );
};

export default Register;
