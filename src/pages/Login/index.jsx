import React,{useState} from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// validation
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import _ from "../../@lodash/index";
// mui
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";


// style
import "./index.scss"

const schema = yup.object().shape({
	email: yup.string().email("Enter correct form of email").required(),
	password: yup
	.string()
	.min(4,"At least 6 symbol please enter")
	.required(),
  });
const Login = ({ authenticate }) => {
    const navigate = useNavigate();
    const [user, setUser]=useState({
		name:"",
		email:"",
		password:"",

	})
    // validation
    const { control, formState, handleSubmit, watch, register, setValue } =
    useForm({
      mode: "onChange",
	  user,
      resolver: yupResolver(schema),
    });
	const { isValid, dirtyFields, errors, setError } = formState;
    // display sign-in or sign up
    const[ display, setDisplay]=useState("");
    const clickSignUpDisplay=()=>{
        setDisplay("right-panel-active");
    }
    const clickSignInDisplay=()=>{
        setDisplay("");
    }
    //sign in
    const SignIn=()=>{
        authenticate();
        navigate("dashboard");
    }
    
  return (
    <div className="sign-in-up">
        <div className={`sign-in-page-container ${display}`} id="container">
            <div className="form-container sign-up-container">
                <form action="#">
                    <h1>Create Account</h1>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button >Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form 
				name="loginForm"
				noValidate
				onSubmit={handleSubmit(SignIn)}>
                    <h1>Sign in</h1>
				 
					 <Controller
					name="email"
					control={control}
                    className="input"
					render={({ field }) => (
						<TextField
						{...field}
						className="mb-24"
						id="standard-start-adornment"
						label="EMAIL"
						type="email"
						error={!!errors.email}
						helperText={errors?.email?.message}
						variant="outlined"
						size="small"
						required
						fullWidth
						margin="dense" 
						/>
					)}
					/>
					 <Controller
                        name="password"
                        control={control}
                        className="input"
                        render={({ field }) => (
                            <TextField
                            {...field}
                            className="mb-24"
                            id="standard-start-adornment"
                            label="PASSWORD"
                            type="password"
                            error={!!errors.password}
                            helperText={errors?.password?.message}
                            variant="outlined"
                            size="small"
                            required
                            fullWidth
                            margin="dense" 
                            />
                        )}
					/>
                    <Link to="#">Forgot your password?</Link>
					<Button
						variant="contained"
						className=" w-full mt-24 button"
						aria-label="Register"
						disabled={_.isEmpty(dirtyFields) || !isValid}
						margin="dense" 
						type="submit"
					    >
						Sign In
					</Button>

				</form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>Login with your personal information to use the site.</p>
                        <button className="ghost" onClick={clickSignInDisplay}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello!</h1>
                        <p>If you do not have an existing account, please create a new account.</p>
                        <button className="ghost"  onClick={clickSignUpDisplay}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login