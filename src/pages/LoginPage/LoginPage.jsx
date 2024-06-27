import { useDispatch } from "react-redux";
import LoginForm from "../../components/LoginForm/LoginForm";
import { logIn } from "../../redux/auth/operations";

// /login - публичный маршрут для логина существующего пользователя, на котором рендеруется компонент страницы LoginPage с формой LoginForm.
const LoginPage = () => {
  const dispatch = useDispatch();
  const handleSubmitForm = (values) => {
    console.log(values);
    
    dispatch(logIn(values));
  }
  return (
    <>
      <LoginForm submit={handleSubmitForm} />
    </>
  );
}

export default LoginPage;