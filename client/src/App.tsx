import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { CartPage } from "./pages/CartPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RegistrationPage } from "./pages/Auth/RegistrationPage";
import { LoginPage } from "./pages/Auth/LoginPage";

import "./scss/components/_all.scss";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchLogin } from "./redux/slices/authSlice";

function App() {
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(fetchLogin())
  // }, [])

  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/regist" element={<RegistrationPage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/cart" element={<CartPage/>}/>
              <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
