import { useDispatch, useSelector } from 'react-redux';
import ContactForm from '../../components/ContactForm/ContactForm';
import SearchBox from '../../components/SearchBox/SearchBox';
import { selectError, selectIsLoading } from '../../redux/contacts/selectors';
import { selectFilteredContacts } from '../../redux/contacts/slice';
import ContactList from '../../components/ContactList/ContactList';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/contacts/operations';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import Spinner from '../../components/Spinner/Spinner';
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Here is your toast.');

const ContactsPage = () => {
  const contacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchContacts());
    }
  }, [isLoggedIn, dispatch]);
  return (
    <div className='wrapper'>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {isLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '10px',
          }}>
          <Spinner />
        </div>
      )}
      {error && <p>{error}</p>}
      {contacts.length > 0 && <ContactList />}
    </div>
  );
};

export default ContactsPage;
