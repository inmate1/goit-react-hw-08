import { useDispatch } from "react-redux";
import LoginForm from "../../components/LoginForm/LoginForm";
import { logIn } from "../../redux/auth/operations";

const LoginPage = () => {

 
  return (
    <>
      <LoginForm  />
    </>
  );
}

export default LoginPage;