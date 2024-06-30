import { Field, Form, Formik } from 'formik';
import { useId } from 'react';
import css from './RegistrationForm.module.css';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is required'),
  email: Yup.string()
    .trim()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

const RegistrationForm = () => {
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const { name, email, password } = values;
    dispatch(register({ name, email, password }));
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <div>
      <h2 className={css.title}>Register in your app</h2>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={FeedbackSchema}
        onSubmit={handleSubmit}>
        {({ isSubmitting, errors, touched }) => (
          <Form className={css.form}>
            <div className={css.fieldWrapper}>
              <label htmlFor={nameId}>Name:</label>
              <Field
                className={css.field}
                type='text'
                name='name'
                id={nameId}
                autoComplete='name'
              />
              {touched.name && errors.name ? (
                <div className={`${css.message} ${css.error}`}>
                  {errors.name}
                </div>
              ) : (
                touched.name && (
                  <div className={`${css.message} ${css.required}`}>
                    Required
                  </div>
                )
              )}
            </div>
            <div className={css.fieldWrapper}>
              <label htmlFor={emailId}>Email:</label>
              <Field
                className={css.field}
                type='email'
                name='email'
                id={emailId}
                autoComplete='email'
              />
              {touched.email && errors.email ? (
                <div className={`${css.message} ${css.error}`}>
                  {errors.email}
                </div>
              ) : (
                touched.email && (
                  <div className={`${css.message} ${css.required}`}>
                    Required
                  </div>
                )
              )}
            </div>
            <div className={css.fieldWrapper}>
              <label htmlFor={passwordId}>Password:</label>
              <Field
                className={css.field}
                type='password'
                name='password'
                id={passwordId}
                autoComplete='new-password'
              />
              {touched.password && errors.password ? (
                <div className={`${css.message} ${css.error}`}>
                  {errors.password}
                </div>
              ) : (
                touched.password && (
                  <div className={`${css.message} ${css.required}`}>
                    Required
                  </div>
                )
              )}
            </div>
            <div className={css.fieldWrapper}>
              <label htmlFor={confirmPasswordId}>Confirm Password:</label>
              <Field
                className={css.field}
                type='password'
                name='confirmPassword'
                id={confirmPasswordId}
                autoComplete='new-password'
              />
              {touched.confirmPassword && errors.confirmPassword ? (
                <div className={`${css.message} ${css.error}`}>
                  {errors.confirmPassword}
                </div>
              ) : (
                touched.confirmPassword && (
                  <div className={`${css.message} ${css.required}`}>
                    Required
                  </div>
                )
              )}
            </div>
            <button className={css.btn} type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
