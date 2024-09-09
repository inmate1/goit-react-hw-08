import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import css from './LoginForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import { selectIsLoading } from '../../redux/auth/selectors';

const LoginForm = () => {
  const emailId = useId();
  const passwordId = useId();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading); 
  const handleSubmit = (values, actions) => {
    dispatch(logIn(values));
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <div className={css.LoginFormWrap}>
      <h2 className={css.title}>Log In in your app!</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          return errors;
        }}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.fieldWrapper}>
              <label htmlFor={emailId}>Email:</label>
              <Field
                className={css.field}
                type='email'
                name='email'
                id={emailId}
                autoComplete='email'
              />
              <ErrorMessage
                name='email'
                component='div'
                className={css.errorMessage}
              />
            </div>
            <div className={css.fieldWrapper}>
              <label htmlFor={passwordId}>Password:</label>
              <Field
                className={css.field}
                type='password'
                name='password'
                id={passwordId}
                autoComplete='current-password'
              />
              <ErrorMessage
                name='password'
                component='div'
                className={css.errorMessage}
              />
            </div>
            <button className={css.btn} type='submit' disabled={isSubmitting}>
              {/* Log In */}
              {isLoading ? 'Loading...' : 'Log In'} {/* <-- Изменение текста на кнопке */}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default LoginForm;
