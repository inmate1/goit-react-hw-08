import css from './Modal.module.css';

const Modal = ({ isOpen, onClose, onConfirm }) => {


  return (
    <div className={css.modalOverlay}>
      <div className={css.modal}>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this contact?</p>
        <div className={css.buttonWrap} >
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
