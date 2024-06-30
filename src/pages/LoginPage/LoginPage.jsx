import { useDispatch } from "react-redux";
import LoginForm from "../../components/LoginForm/LoginForm";
import { logIn } from "../../redux/auth/operations";

const LoginPage = () => {

  const dispatch = useDispatch();

  const handleSubmitForm = (values) => { 
    dispatch(logIn(values));
  }
  
  return (
    <>
      <LoginForm submit={handleSubmitForm} />
    </>
  );
}

export default LoginPage;