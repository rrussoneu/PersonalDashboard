import { useRef, useState, useEffect } from "react";
import axios from "../../api/axios";
const LOGIN_URL = "/auth/";
import { useNavigate, useLocation } from "react-router-dom";
import "./loginregister.css";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const USER_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// basic password regex for chars, nums
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "PersonalDashApp/users/";

const LoginRegister = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/main/home";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [firstNameFocus, setFirstNameFocus] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);

  const [validName, setValidName] = useState(false);
  // focus on input field
  const [userFocus, setUserFocus] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  // validate user array every time it changes
  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  // need passwords to match
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //localStorage.setItem("userId", 1);
    //navigate(from, { replace: true });

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          //withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.token;
      const userId = response?.data?.id;
      //setAuth({ userId, accessToken });
      console.log(accessToken);
      console.log(userId);
      localStorage.setItem("userId", userId);
      localStorage.setItem("accessToken", accessToken);

      setUser("");
      setPwd("");
      // navigate away on success
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const handleSubmitReg = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack to try to avoid the regex
    console.log("here");
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        // need to do email: user because the backend expects "email" in the json
        JSON.stringify({
          email: user,
          first_name: firstName,
          last_name: lastName,
          password: pwd,
        }),
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setPwd("");
      setMatchPwd("");
      setIsActive(!isActive);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="container-wrapper">
      <div className={`container ${isActive ? "active" : ""}`} id="container">
        <div className="form-container sign-up">
          <form onSubmit={handleSubmitReg}>
            <h1>Create Account</h1>
            <span>Register with email and password</span>
            <input
              type="text"
              id="firstName"
              autoComplete="off"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
              onFocus={() => setFirstNameFocus(true)}
              onBlur={() => setFirstNameFocus(false)}
              placeholder="First Name"
            />
            <input
              type="text"
              id="lastName"
              autoComplete="off"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
              onFocus={() => setLastNameFocus(true)}
              onBlur={() => setLastNameFocus(false)}
              placeholder="Last Name"
            />
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              placeholder="Email"
            />
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              placeholder="Password"
            />
            <div
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <InfoOutlinedIcon />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </div>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              placeholder="Confirm Password"
            />
            <div
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <InfoOutlinedIcon />
              Must match the first password input field.
            </div>
            <button
              disabled={!validName || !validPwd || !validMatch ? true : false}
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <span>Using your email and password</span>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              placeholder="Email"
            />
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              placeholder="Password"
            />
            <a href="#">Forgot Your Password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Please log in if you've been here before</p>
              <button className="hidden" id="login" onClick={toggleActive}>
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello!</h1>
              <p>Register here if new</p>
              <button className="hidden" id="register" onClick={toggleActive}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
