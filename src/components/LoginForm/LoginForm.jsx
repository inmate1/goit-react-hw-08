import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';

const LoginForm = ({ submit }) => {
  const emailId = useId();
  const passwordId = useId();

  const handleSubmit = (values, actions) => {
    submit(values);
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <div>
      <h1>Any place in your app!</h1>
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
          <Form>
            <div>
              <label htmlFor={emailId}>Email:</label>
              <Field
                type='email'
                name='email'
                id={emailId}
                autoComplete='email'
              />
              <ErrorMessage name='email' component='div' />
            </div>
            <div>
              <label htmlFor={passwordId}>Password:</label>
              <Field
                type='password'
                name='password'
                id={passwordId}
                autoComplete='current-password'
              />
              <ErrorMessage name='password' component='div' />
            </div>
            <button type='submit' disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default LoginForm;
