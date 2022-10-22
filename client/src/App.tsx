import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { CartPage } from "./pages/Cart/CartPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RegistrationPage } from "./pages/Auth/RegistrationPage";
import { LoginPage } from "./pages/Auth/LoginPage";
import { useEffect } from "react";
import { fetchAuthMe } from "./redux/slices/authSlice";
import { useDispatch } from "react-redux";
import "./scss/components/_all.scss";



function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [dispatch])

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
