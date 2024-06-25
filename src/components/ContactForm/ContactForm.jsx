import { Formik, Form, Field } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';

import css from './ContactForm.module.css';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps';

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required!!!'),
  number: Yup.string()
    .trim()
    .matches(
      /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      'Invalid phone number'
    )
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required!!!'),
});
const initialValues = {
  name: '',
  number: '',
};

const ContactForm = () => {
  const nameFieldId = useId();
  const phoneFieldId = useId();

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(
      addContact({
        name: values.name,
        number: values.number,
      })
    );
    actions.resetForm();
  };

  return (
    <div>
      <hr />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}>
        {({ errors, touched }) => (
          <Form className={css.form}>
            <div className={css.fieldWrapper}>
              <label htmlFor={nameFieldId}>Name</label>
              <Field
                className={css.field}
                type='text'
                name='name'
                id={nameFieldId}
                placeholder='First Last'
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
              <label htmlFor={phoneFieldId}>Number</label>
              <Field
                className={css.field}
                type='tel'
                name='number'
                id={phoneFieldId}
                placeholder='111-111-1111'
              />
              {touched.number && errors.number ? (
                <div className={`${css.message} ${css.error}`}>
                  {errors.number}
                </div>
              ) : (
                touched.number && (
                  <div className={`${css.message} ${css.required}`}>
                    Required
                  </div>
                )
              )}
            </div>

            <button className={css.btn} type='submit'>
              Add contact
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
