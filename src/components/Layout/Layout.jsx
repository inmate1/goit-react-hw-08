// Создайте компонент Layout , который будет рендерить компонент AppBar и окутывать все маршруты, чтобы быть доступным на каждом из них.

import { Suspense } from "react";
import AppBar from "../AppBar/AppBar"
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const Layout = () => {
  return (
    <>
      <AppBar />
      <Suspense
        fallback={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}>
            <Spinner />
          </div>
        }>
        <Outlet />
      </Suspense>
    </>
  );
}

export default Layout;