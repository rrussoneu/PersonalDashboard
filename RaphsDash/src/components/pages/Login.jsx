import { useRef, useState, useEffect } from "react";
// import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
const LOGIN_URL = "/auth/";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./login.scss";

const Login = () => {
  //const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/main/home";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

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
      //console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.token;
      const userId = response?.data?.id;
      //setAuth({ userId, accessToken });
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
  /*
  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);
*/
  return (
    <section className="center-login">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <div className="login-main">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form-item">
            <label htmlFor="username">Username/ Email:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
          </div>
          <div className="login-form-item">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
          </div>

          <div className="login-form-item">
            <button>Sign In</button>
          </div>

          {/**<div className="persistCheck">
          <input
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked={persist}
          />
          <label htmlFor="persist">Trust This Device</label>
        </div> */}
        </form>
        <p>
          Need an Account?
          <br />
          <span className="line">
            {/*put router link here*/}
            <Link to="/register">Sign Up</Link>
          </span>
        </p>
      </div>
    </section>
  );
};

export default Login;
