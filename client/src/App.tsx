import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/HeaderComp";
import { CartPage } from "./pages/Cart/CartPage";
import { HomePage } from "./pages/Home/HomePage";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage";
import { RegistrationPage } from "./pages/Auth/RegistrationPage";
import { LoginPage } from "./pages/Auth/LoginPage";
import { useEffect } from "react";
import { fetchAuthMe } from "./redux/slices/authSlice";
import { AccountPage } from "./pages/Account/AccountPage";
import { useDispatch } from "react-redux";
import s from "./scss/_app.module.scss";
import "./scss/libs/_normalize.scss"



function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [dispatch])

  
  return (
    <>
      <div className={s.wrapper}>
        <Header />
        <div className={s.content}>
          <div className={s.container}>
            <Routes>
              <Route path="/account" element={<AccountPage />} />
              <Route path="/regist" element={<RegistrationPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
