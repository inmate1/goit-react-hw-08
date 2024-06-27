import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useId } from 'react';



const RegistrationForm = ({ submit }) => {
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();

  const handleSubmit = (values, actions) => {
    const { name, email, password } = values;
    submit({ name, email, password });
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <div>
      <h1>Anywhere in your app!</h1>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
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
          } else if (values.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
          }

          if (!values.confirmPassword) {
            errors.confirmPassword = 'Required';
          } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
          }

          return errors;
        }}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor={nameId}>Name:</label>
              <Field type='text' name='name' id={nameId} autoComplete='name' />
              <ErrorMessage name='name' component='div' />
            </div>
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
                autoComplete='new-password'
              />
              <ErrorMessage name='password' component='div' />
            </div>
            <div>
              <label htmlFor={confirmPasswordId}>Confirm Password:</label>
              <Field
                type='password'
                name='confirmPassword'
                id={confirmPasswordId}
                autoComplete='new-password'
              />
              <ErrorMessage name='confirmPassword' component='div' />
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

export default RegistrationForm;
