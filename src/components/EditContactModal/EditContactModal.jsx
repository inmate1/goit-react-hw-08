import { useId, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateContact } from '../../redux/contacts/operations';
import toast from 'react-hot-toast';
import css from './EditContactModal.module.css';

const EditContactModal = ({ isOpen, onClose, contactId, initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData ? initialData.name : '',
    number: initialData ? initialData.number : '',
  });
  const dispatch = useDispatch();
  const nameId = useId();
  const numberId = useId();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const updatedContact = {
      name: formData.name,
      number: formData.number,
    };

    try {
      await dispatch(updateContact({ id: contactId, updatedContact })).unwrap();
      toast.success('Contact updated successfully!');
      onClose();
    } catch (error) {
      toast.error(`Failed to update contact: ${error.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={css.modalOverlay}>
      <div className={css.modal}>
        <h2>Edit Contact</h2>
        <form className={css.form} onSubmit={handleSubmit}>
          <label htmlFor={nameId}>
            Name:
            <input
              id={nameId}
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor={numberId}>
            Number:
            <input
              id={numberId}
              type='text'
              name='number'
              value={formData.number}
              onChange={handleChange}
            />
          </label>
          <div className={css.buttonWrap}>
            <button type='submit'>Change</button>
            <button type='button' onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContactModal;
