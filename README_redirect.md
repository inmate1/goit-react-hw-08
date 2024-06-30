Давайте разберем строку кода:

<Route
    path="/contacts"
    element={
        <PrivateRoute component={<ContactsPage />} redirectTo="/login" />
    }
/>
Объяснение:
Компонент Route
Route — это компонент из react-router-dom, который определяет маршрут в вашем приложении. Он принимает несколько пропсов, но самые важные из них:

path: путь, по которому этот маршрут должен срабатывать.
element: элемент, который должен быть отрендерен, когда этот маршрут активен.
Проп path
path="/contacts"
Этот проп определяет, что маршрут сработает, когда URL-адрес будет "/contacts".

Проп element
element={
    <PrivateRoute component={<ContactsPage />} redirectTo="/login" />
}
Этот проп определяет компонент, который должен быть отрендерен, когда маршрут активен. В данном случае, это компонент PrivateRoute.

Компонент PrivateRoute
<PrivateRoute component={<ContactsPage />} redirectTo="/login" />
Этот компонент оборачивает ContactsPage и добавляет проверку авторизации. Давайте детально рассмотрим, что делает PrivateRoute.

Проверка состояния авторизации:

const isLoggedIn = useSelector(selectIsLoggedIn);
Использует useSelector, чтобы получить состояние isLoggedIn из Redux.

Логика рендеринга:

return isLoggedIn ? component : <Navigate to={redirectTo} />;
Если isLoggedIn истинно (пользователь авторизован), компонент рендерит ContactsPage (component).
Если isLoggedIn ложно (пользователь не авторизован), компонент рендерит Navigate, который перенаправляет пользователя на страницу, указанную в redirectTo (в данном случае, на "/login").
Итог
Строка кода:

<Route
    path="/contacts"
    element={
        <PrivateRoute component={<ContactsPage />} redirectTo="/login" />
    }
/>
делает следующее:

Когда пользователь переходит на "/contacts", срабатывает этот маршрут.
Компонент PrivateRoute проверяет, авторизован ли пользователь.
Если пользователь авторизован, рендерится компонент ContactsPage.
Если пользователь не авторизован, он перенаправляется на страницу входа ("/login").
Таким образом, PrivateRoute защищает доступ к странице контактов, позволяя доступ только авторизованным пользователям.