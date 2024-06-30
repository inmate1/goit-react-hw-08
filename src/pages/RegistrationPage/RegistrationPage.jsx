import { useDispatch } from "react-redux";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import { register } from "../../redux/auth/operations";

const RegistrationPage = () => {
    const dispatch = useDispatch();
    const handleSubmitForm = (values) => {
       
        dispatch(register(values));
    }
    return <RegistrationForm submit={handleSubmitForm}/>;
}

export default RegistrationPage