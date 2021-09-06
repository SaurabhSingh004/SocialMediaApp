
import {  useRef } from "react";
import "./login.css";
import { useContext } from "react";
import {loginCall} from "../../apiCalls";
import {AuthContext} from"../../context/AuthContext";
import {CircularProgress} from "@material-ui/core"
import {Link} from "react-router-dom";
export default function Login() {
  const email = useRef();
  const password = useRef();
  const {user,isFetching,error,dispatch}=useContext(AuthContext);
    const handleClick = (e) => {
    e.preventDefault();
    loginCall({email:email.current.value,password:password.current.value},dispatch)
    console.log("email ",email.current.value);
  };
  console.log("user",user)
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">MysocialApp</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on MysocialApp.
          </span>
        </div>
        <div className="loginRight">
        <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
                {isFetching?<CircularProgress color="white" size="22px"/>:"Login"}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
            <Link to="/register" style={{textDecoration:"none"}}>
						  "Create New Account"
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
