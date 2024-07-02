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
import EditContactModal from '../EditContactModal/EditContactModal';




const Contact = ({ id, name, number }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Состояние для модального окна редактирования
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Состояние для модального окна удаления

  const dispatch = useDispatch();

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId))
      .unwrap()
      .then(() => toast.success('Contact deleted successfully!'))
      .catch(() => toast.error('Failed to delete contact.'));
  };
  const openEditModal = () => setIsEditModalOpen(true); 
  const closeEditModal = () => setIsEditModalOpen(false); 

  const openDeleteModal = () => setIsDeleteModalOpen(true); 
  const closeDeleteModal = () => setIsDeleteModalOpen(false); // Функция для закрытия модального окна удаления

 
  const confirmDelete = () => {
    handleDeleteContact(id);
    closeDeleteModal();
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
      <div className={css.buttonWrapper}>
        <button
          className={css.btnContact}
          type='button'
          aria-label='edit'
          onClick={openEditModal}>
          <span role='img' aria-label='Edit icon'>
            ✏️
          </span>
        </button>
        <button
          className={css.btnContact}
          type='button'
          aria-label='delete'
          onClick={openDeleteModal}>
          {/* Delete */}
          <span role='img' aria-label='Delete icon'>
            🗑️
          </span>
        </button>
      </div>
    {  isDeleteModalOpen &&
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />}
      {isEditModalOpen && (
        <EditContactModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          contactId={id}
          initialData={{ name, number }}
        />
      )}
    </li>
  );
};

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default Contact;
