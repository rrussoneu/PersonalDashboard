import { useRef, useState, useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import "./register.scss";
// need to add validation for email, first name, last name
// for now, username will function as email instead

/**                     
 *                      <label htmlFor="email">
                            Email:
                        </label>
                        <input
                        type="email"
                            id="email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={lastName}
                            required
                            // aria-describedby="firstnamenote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
 */

const USER_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// basic password regex for chars, nums
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "PersonalDashApp/users/";

const Register = () => {
  // focus on user input
  const userRef = useRef();

  // focus on error for screen reader
  const errRef = useRef();

  // for firstName and lastName and email

  const [firstName, setFirstName] = useState("");
  const [firstNameFocus, setFirstNameFocus] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);

  // tied to user
  const [user, setUser] = useState("");
  // tied to whether user is valid
  const [validName, setValidName] = useState(false);
  // focus on input field
  const [userFocus, setUserFocus] = useState(false);

  // same thing for passwords
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // when component loads focus on user
  useEffect(() => {
    userRef.current.focus();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack to try to avoid the regex
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
    <>
      {/** If succes then were done and they can sign in, else show the page*/}
      {success ? (
        <section className="on-success">
          <h1>Success!</h1>
          <p>
          <Link to="/login">Sign Up</Link>
          </p>
        </section>
      ) : (
        <section className="register-main">
          {/** Display error message if error, and moves off screen for screen readers */}
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div className="register-content">
            <h1>Register</h1>
            <form onSubmit={handleSubmit} className="register-form">
              <div className="register-form-section">
                <label htmlFor="firstName" className="register-field-title">
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  autoComplete="off"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  required
                  // aria-describedby="firstnamenote"
                  onFocus={() => setFirstNameFocus(true)}
                  onBlur={() => setFirstNameFocus(false)}
                />
              </div>

              <div className="register-form-section">
                <label htmlFor="lastName" className="register-field-title">
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  autoComplete="off"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  required
                  // aria-describedby="firstnamenote"
                  onFocus={() => setLastNameFocus(true)}
                  onBlur={() => setLastNameFocus(false)}
                />
              </div>

              <div className="register-form-section">
                <label htmlFor="username" className="register-field-title">
                  Username:
                  <CheckIcon className={validName ? "valid" : "hide"} />
                  <HighlightOffIcon
                    className={validName || !user ? "hide" : "invalid"}
                  />
                </label>
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
                />
                <p
                  id="uidnote"
                  className={
                    userFocus && user && !validName
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <InfoOutlinedIcon />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
              </div>

              <div className="register-form-section">
                <label htmlFor="password" className="register-field-title">
                  Password:
                  <CheckIcon className={validPwd ? "valid" : "hide"} />
                  <HighlightOffIcon
                    className={validPwd || !pwd ? "hide" : "invalid"}
                  />
                </label>
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
                />
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd ? "instructions" : "offscreen"
                  }
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
                </p>
              </div>

              <div className="register-form-section">
                <label htmlFor="confirm_pwd" className="register-field-title">
                  Confirm Password:
                  <CheckIcon
                    className={validMatch && matchPwd ? "valid" : "hide"}
                  />
                  <HighlightOffIcon
                    className={validMatch || !matchPwd ? "hide" : "invalid"}
                  />
                </label>
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
                />
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch ? "instructions" : "offscreen"
                  }
                >
                  <InfoOutlinedIcon />
                  Must match the first password input field.
                </p>
              </div>
              <div className="register-form-section">
                <button
                  disabled={
                    !validName || !validPwd || !validMatch ? true : false
                  }
                >
                  Sign Up
                </button>
              </div>
            </form>
            <p>
              Already registered?
              <br />
              <span className="line">
                {/*put router link here*/}
                <Link to="/login">Sign In</Link>
              </span>
            </p>
          </div>
        </section>
      )}
    </>
  );
};

export default Register;
