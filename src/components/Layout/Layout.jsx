// Создайте компонент Layout , который будет рендерить компонент AppBar и окутывать все маршруты, чтобы быть доступным на каждом из них.

import { Suspense } from "react";
import AppBar from "../AppBar/AppBar"
import { Outlet } from "react-router-dom";

const Layout = ({children}) => {
  return (
    <>
      <AppBar />
      <Suspense fallback={<div>Loading..null.</div>}>
        {/* {children} */}
        <Outlet />
      </Suspense>
    </>
  );
}

export default Layout;