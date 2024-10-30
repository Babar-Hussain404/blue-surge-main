import { useDispatch, useSelector } from "react-redux";
import LandingPage from "./Pages/LandingPage";
import LoginSignup from "./Pages/auth/LoginSignup";
import "./assets/css/social.css";
import "./assets/css/social2.css";
import "./assets/publiccss/main.css";
import "./assets/publiccss/themes.css";
import "./assets/publiccss/plugins.css";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { logoutAction } from "./redux/action";

function App() {
  const dispatch = useDispatch();
  const logoutState = useSelector((state) => state.logoutReducer);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      dispatch(logoutAction(false));
    }
  }, [token]);
  return (
    <>
      {!logoutState ? <LoginSignup /> : <LandingPage />}
      <ToastContainer />
    </>
  );
}

export default App;
