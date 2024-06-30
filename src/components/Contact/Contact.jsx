import css from './Contact.module.css';
import PropTypes from 'prop-types';
import { FaPhone } from 'react-icons/fa6';
import { IoPersonSharp } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import toast from 'react-hot-toast';



const Contact = ({ id, name, number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId))
      .unwrap()
      .then(() => toast.success('Contact deleted successfully!'))
      .catch(() => toast.error('Failed to delete contact.'));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const confirmDelete = () => {
    handleDeleteContact(id);
    closeModal();
  };
  return (
    <li className={css.listItem} id={id}>
      <div>
        <div className={css.text}>
          <IconContext.Provider value={{ color: 'black', size: '16' }}>
            <IoPersonSharp />
          </IconContext.Provider>
          <p>{name}</p>
        </div>
        <div className={css.text}>
          <IconContext.Provider value={{ color: 'black', size: '16' }}>
            <FaPhone />
          </IconContext.Provider>

          <p>{number}</p>
        </div>
      </div>
      <button
        className={css.btnContact}
        type='button'
        aria-label='delete'
        onClick={openModal}>
        Delete
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
    </li>
  );
};

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default Contact;
