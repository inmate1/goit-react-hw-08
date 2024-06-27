import './App.css';

import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from "./pages/HomePage/HomePage"
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ContactsPage from './pages/ContactsPage/ContactsPage';


function App() {

  


  return (
    // <Layout>
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<HomePage />} />
        {/* <Route path='/' element={<HomePage />} /> */}
        <Route path='register' element={<RegistrationPage />} />
        <Route path='login' element={<LoginPage />} />

        <Route path='contacts' element={<ContactsPage />} />
        <Route path='*' element={<Navigate to='/' />} />

      </Route>
    </Routes>
    // </Layout>
  );
}

export default App;

// При перезавантаженні сторінки /contacts необхідно забезпечити збереження статусу авторизації користувача. Це означає, що система повинна автоматично відновлювати авторизований стан користувача без необхідності повторного введення логіна та пароля.
