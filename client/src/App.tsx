import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { CartPage } from "./pages/Cart/CartPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RegistrationPage } from "./pages/Auth/RegistrationPage";
import { LoginPage } from "./pages/Auth/LoginPage";

import "./scss/components/_all.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAuthMe } from "./redux/slices/authSlice";
// import { useCustomSelector } from "./hooks/store";
import { selectAuthData } from "./redux/selectors";


function App() {
  const dispatch = useDispatch()
  // const isAuth = Boolean(useCustomSelector(selectAuthData).data);
  const isAuth = useSelector(selectAuthData).data;

  console.log(isAuth, 'isAuth')

  // useEffect(() => {
  //   dispatch(fetchAuthMe(JSON.stringify({userId: isAuth.data?._id})))
  // }, [])
  
  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])

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
