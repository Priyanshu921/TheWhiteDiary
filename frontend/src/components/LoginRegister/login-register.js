import React, { useState, useEffect } from "react";
import practiseCss from "./login.module.css";
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../Actions/userActions";
// import authImage from '../../../public/Authentication_Wallpaper.jpg'

export const LoginRegister = (props) => {
  const navigate = useNavigate();
  const registeredUser = useSelector(
    (state) => state.userReducer.userRegistered
  );
  const userNames = useSelector(
    (state) => state.userReducer.userNameCategories
  );
  const user = useSelector((state)=> state.userReducer.user)
  const dispatch = useDispatch();
  //alert variable
  const [userAlert,setUserAlert] = useState("")
  //Register variables
  const [registerUser, setRegisterUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userNameCategory:'',
  });
  const [error,setError] = useState({
    registerEmail:'',
    registerPassword:'',
    registerConfirmPassword:'',
    registerUserNameCategory:'',
    loginEmail:'',
    loginPassword:''
  })
  const isRegisterDisabled =
    error.registerEmail === null &&
    error.registerPassword === null &&
    error.registerConfirmPassword === null &&
    error.registerUserNameCategory === null;

  const [userNameCategories, setUserNameCategories] = useState([]);
  //login variables
  const [loginUser,setLoginUser] = useState({
    email:'',
    password:''
  })
  const [active, setActive] = useState(props.route);
  useEffect(() => {
    if (active === "SignUp") {
      getUserNames();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    if(userNames?.length){
      setUserNameCategories(userNames)
    }
  }, [userNames]);

   useEffect(() => {
     if(registeredUser){
        setUserAlert(registeredUser)
        if (registeredUser.statusCode === 201) {
          setRegisterUser({
            email: "",
            password: "",
            confirmPassword: "",
            userNameCategory: "",
          });
          setError({
            ...error,
            registerEmail: "",
            registerPassword: "",
            registerConfirmPassword: "",
            registerUserNameCategory: "",
          });
          navigate("/login");
          Signin();
        }
     }
     if(user){
       setUserAlert(user)
       if(user.statusCode === 200)
          navigate("/")
     }
     return () =>{
      dispatch(userActions.cleanRegisteredUser())
     }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [registeredUser,user]);

  const getUserNames = () => {
    dispatch(userActions.getUsernameCategories())
  };

  const Signup = () => {
    navigate('/register')
    setActive("SignUp");
  };
  const Signin = () => {
    navigate('/login')
    setActive("SignIn");
  };
  const handleRegisterFormChange = (e) => {
    setRegisterUser({ ...registerUser, [e.target.name]: e.target.value });
  };
  const handleLoginFormChange = (e) => {
    setLoginUser({...loginUser,[e.target.name]:e.target.value})
  }
  const register = async (e) => {
    e.preventDefault();
    dispatch(userActions.register({
        ...registerUser,
      }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(userActions.login({...loginUser}))
  }
  const handleBlur = (event) => {
    if (active === "SignUp") {
      switch (event.target.name) {
        case "email":
          if (!event.target.value) {
            setError({ ...error, registerEmail: "Please enter email" });
          } else if (
            !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
              event.target.value
            )
          ) {
            setError({ ...error, registerEmail: "Please enter valid email" });
          } else {
            setError({ ...error, registerEmail: null });
          }
          break;
        case "password":
          const passwordValidator =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          if (!event.target.value) {
            setError({ ...error, registerPassword: "Please enter password" });
          } else if (
            (
              event.target.value !== registerUser.confirmPassword &&
              registerUser?.confirmPassword
            )
          ) {
            setError({
              ...error,
              registerPassword: "Passwords don't match",
              registerConfirmPassword: "Passwords don't match",
            });
          }
          else if(!passwordValidator.test(event.target.value)){
            setError({ ...error, registerPassword: "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character." });
          }
           else if (registerUser?.confirmPassword) {
            setError({
              ...error,
              registerPassword: null,
              registerConfirmPassword: null,
            });
          }
          break;
        case "confirmPassword":
          if (!event.target.value) {
            setError({ ...error, registerConfirmPassword: "Please re enter password" });
          } else if (
            event.target.value !== registerUser.password &&
            registerUser.password
          ) {
            setError({
              ...error,
              registerConfirmPassword: "Passwords don't match",
              registerPassword: "Passwords don't match",
            });
          } else if (registerUser?.password) {
            setError({
              ...error,
              registerConfirmPassword: null,
              registerPassword: null,
            });
          }
          break;
        case 'userNameCategory':
          if (!event.target.value || event.target.value === "Select Username Category") {
            setError({
              ...error,
              registerUserNameCategory: "Please select username category",
            });
          } else {
            setError({ ...error, registerUserNameCategory: null });
          }
          break;
        default:
          break;
      }
    }
    if(active === 'SignIn'){
      switch (event.target.name) {
        case "email":
          if (!event.target.value) {
            setError({ ...error, loginEmail: "Please enter email" });
          } else if (
            !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
              event.target.value
            )
          ) {
            setError({ ...error, loginEmail: "Please enter valid email" });
          } else {
            setError({ ...error, loginEmail: null });
          }
          break;
        case 'password':
          if(!event.target.value){
            setError({ ...error, loginPassword: "Please enter Password" });
          }
          else{
            setError({ ...error, loginPassword: null });
          }
          break;
        default:
          break;
    }
  }
  };
  return (
    <div className={`${practiseCss.container}`}>
      {userAlert && (
        <div
          className={`${practiseCss.alertBox} alert ${
            userAlert.statusCode === 201 || userAlert.statusCode === 200
              ? "alert-success"
              : "alert-danger"
          } alert-dismissible fade show form-control`}
          role="alert"
        >
          {userAlert?.message || userAlert?.error}
          <button
            type="button"
            onClick={() => setUserAlert("")}
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <div className={`${practiseCss.innerContainer}`}>
        <div className={`${practiseCss.user} ${practiseCss.userSignUp} `}>
          <div
            className={`${practiseCss.signup_image} ${
              active === "SignUp" ? practiseCss.active : ""
            }`}
          >
            <img
              // src="https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGxvZ2lufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              src="Authentication_Wallpaper.jpg"
              className={`${practiseCss.authImage}`}
              alt="Login"
            />
          </div>
          <div
            className={`${practiseCss.formBox} ${
              active === "SignUp" ? practiseCss.active : ""
            }`}
          >
            <form onSubmit={register}>
              <h2> SIGN UP</h2>
              <input
                type="email"
                className={`form-control mt-3 error ${
                  error.registerEmail ? "is-invalid" : ""
                } ${error.registerEmail === null ? "is-valid" : ""}`}
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                name="email"
                value={registerUser.email}
                onChange={handleRegisterFormChange}
                onBlur={handleBlur}
              />
              {error.registerEmail && (
                <p className="text-danger p-2">{error.registerEmail}</p>
              )}
              <input
                type="password"
                className={`form-control mt-3 error ${
                  error.registerPassword ? "is-invalid" : ""
                } ${error.registerPassword === null ? "is-valid" : ""}`}
                id="password"
                aria-describedby="emailHelp"
                placeholder="Enter password"
                value={registerUser.password}
                onChange={handleRegisterFormChange}
                name="password"
                onBlur={handleBlur}
              />
              {error.registerPassword && (
                <p className="text-danger p-2">{error.registerPassword}</p>
              )}
              <input
                type="password"
                className={`form-control mt-3 error ${
                  error.registerConfirmPassword ? "is-invalid" : ""
                } ${error.registerConfirmPassword === null ? "is-valid" : ""}`}
                id="confirmPassword"
                aria-describedby="emailHelp"
                placeholder="Confirm password"
                value={registerUser.confirmPassword}
                onChange={handleRegisterFormChange}
                name="confirmPassword"
                onBlur={handleBlur}
              />
              {error.registerConfirmPassword && (
                <p className="text-danger p-2">
                  {error.registerConfirmPassword}
                </p>
              )}
              <select
                className={`form-control mt-3 error ${
                  error.registerUserNameCategory ? "is-invalid" : ""
                } ${error.registerUserNameCategory === null ? "is-valid" : ""}`}
                aria-label="Default select example"
                onChange={handleRegisterFormChange}
                onBlur={handleBlur}
                value={registerUser.registerUserNameCategory}
                name="userNameCategory"
                placeholder="Username Category"
              >
                <option> Select Username Category</option>
                {userNameCategories.length &&
                  userNameCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
              </select>
              {error.registerUserNameCategory && (
                <p className="text-danger p-2">
                  {error.registerUserNameCategory}
                </p>
              )}
              <button
                disabled={!isRegisterDisabled}
                className="btn btn-primary my-2 w-100"
              >
                Sign up
              </button>
              <p className={practiseCss.goToSignupBtn}>
                Already have an account?
                <span className="ms-2" to="#" onClick={() => Signin()}>
                  Sign in.
                </span>
              </p>
            </form>
          </div>
        </div>
        {/* SignIn */}
        <div className={`${practiseCss.user} ${practiseCss.userSignIn} `}>
          <div
            className={`${practiseCss.formBox} ${
              active === "SignIn" ? practiseCss.active : ""
            }`}
          >
            <form onSubmit={handleLogin}>
              <h2> SIGN IN</h2>

              <input
                type="email"
                className={`form-control mt-3 error ${
                  error.loginEmail ? "is-invalid" : ""
                } ${error.loginEmail === null ? "is-valid" : ""}`}
                id="exampleInputEmail2"
                aria-describedby="emailHelp"
                onBlur={handleBlur}
                placeholder="Enter email"
                name="email"
                value={loginUser.email}
                onChange={handleLoginFormChange}
              />
              {error.loginEmail && (
                <p className="text-danger p-2">{error.loginEmail}</p>
              )}
              <input
                type="password"
                className={`form-control mt-3 error ${
                  error.loginPassword ? "is-invalid" : ""
                }`}
                id="exampleInputEmail3"
                aria-describedby="emailHelp"
                placeholder="Enter password"
                name="password"
                value={loginUser.password}
                onBlur={handleBlur}
                onChange={handleLoginFormChange}
              />
              {error.loginPassword && (
                <p className="text-danger p-2">{error.loginPassword}</p>
              )}
              <button
                className={`btn btn-primary my-2 ${practiseCss.btn_signin}`}
              >
                Sign in
              </button>
              <p className={practiseCss.goToSignupBtn}>
                Don't have an account?
                <span className="ms-1" to="#" onClick={() => Signup()}>
                  Sign up.
                </span>
              </p>
            </form>
          </div>
          <div
            className={`${practiseCss.signin_image} ${
              active === "SignIn" ? practiseCss.active : ""
            }`}
          >
            <img
              // src="https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGxvZ2lufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              src="Authentication_Wallpaper.jpg"
              className={`${practiseCss.authImage}`}
              alt="Login"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
