import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
import AuthContext from "../features/authProvider";
import { HandleLogin } from "../util/HandleUser";
import { PiEyeDuotone, PiEyeClosed } from "react-icons/pi";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const { email, password } = formData;

  // console.log("befor " + auth);
  // console.log("useeffect " + auth.isSuccess);

  useEffect(() => {
    if (auth.isSuccess || auth.user) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user, auth.isSuccess]);

  const changeHandler = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleVisible = () => {
    setVisible(!visible);
    console.log(visible);
  };

  const onsubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    HandleLogin(userData, setAuth);
  };
  return (
    <div className="sub-container">
      <section className="heading">
        <h1>Login</h1>
        <p>Please Login</p>
      </section>

      <section className="form">
        <form onSubmit={onsubmit}>
          <div className="form-item">
            <input
              type="email"
              name="email"
              id="email"
              onChange={changeHandler}
              value={email}
              placeholder="Enter E-mail"
            />
          </div>
          <div className="form-item">
            <input
              type={visible ? "text" : "password"}
              name="password"
              id="password"
              onChange={changeHandler}
              value={password}
              placeholder="Enter password"
            />
            <div className="eye_icon" onClick={handleVisible}>
              {visible ? <PiEyeClosed /> : <PiEyeDuotone />}
            </div>
          </div>

          <div className="form-item">
            <button type="sumbit" className="btn btn-block">
              Login
            </button>
          </div>
        </form>
      </section>
      <section className="heading">
        <p>
          Doesn't have an account yet?
          <Link to="/register"> Create One.</Link>
        </p>
      </section>
    </div>
  );
}

export default Login;
