import "./register.css";
import {useHistory} from "react-router";
import axios from "axios";
import {useRef} from "react";
import {Link} from "react-router-dom"; 
export default function Register() {
	const username = useRef();
	const email = useRef();
	const password = useRef();
	const passwordAgain = useRef();
	const history=useHistory();
		const handleClick = async(e) => {
		e.preventDefault();
		if(passwordAgain.current.value!==password.current.value)
		{
			passwordAgain.current.setCustomValidity("Password Don't Match!");
		}
		else
		{
			const user={
				username:username.current.value, 
				email:email.current.value,
				password:password.current.value
			}
			try{
				await axios.post("/auth/register",user);
				history.push("/login");
			}
			catch(err)
			{
				console.log(err);
			}
		}
	};
	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLeft">
					<h3 className="loginLogo">MysocialApp</h3>
					<span className="loginDesc">
						Connect with friends and the world around you on MysocialApp.
					</span>
				</div>
				<div className="loginRight" >
					<form className="loginBox" onSubmit={handleClick}>
						<input placeholder="Username" ref={username} type="text" className="loginInput" />
						<input placeholder="Email" ref={email} type="email" className="loginInput" />
						<input placeholder="Password" ref={password} type="password" minLength="6" className="loginInput" />
						<input placeholder="Password Again" ref={passwordAgain} type="password" minLength="6" className="loginInput" />
						<button className="loginButton" type="submit">Sign Up</button>
						
						<button className="loginRegisterButton" type="submit">
						<Link to="/login" style={{textDecoration:"none"}}>
							Log into Account
							</Link>
						</button>
						
					</form>
				</div>
			</div>
		</div>
	);
}
