import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthContext from "../features/authProvider";
import { HandleRegister } from "../util/HandleUser";
import { PiEyeDuotone, PiEyeClosed } from "react-icons/pi";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const { username, email, password, password2 } = formData;

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
  const handleVisible2 = () => {
    setVisible2(!visible2);
    console.log(visible);
  };

  const onsubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
      console.log("password not match");
    } else {
      const userData = {
        username,
        email,
        password,
      };

      HandleRegister(userData, setAuth);
    }
  };

  return (
    <div className="sub-container">
      <section className="heading">
        <h1>Register</h1>
        <p>fill out the information</p>
      </section>

      <section className="form">
        <form onSubmit={onsubmit}>
          <div className="form-item">
            <input
              type="text"
              name="username"
              id="username"
              onChange={changeHandler}
              value={username}
              placeholder="Enter Username"
            />
          </div>
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
              autoComplete="false"
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
            <label htmlFor="password2">Confirm Password</label>
            <input
              type={visible2 ? "text" : "password"}
              autoComplete="false"
              name="password2"
              id="password2"
              onChange={changeHandler}
              value={password2}
              placeholder="Confirm password"
            />
            <div className="eye_icon" onClick={handleVisible2}>
              {visible2 ? <PiEyeClosed /> : <PiEyeDuotone />}
            </div>
          </div>
          <div className="form-item">
            <button type="sumbit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
      <section className="heading">
        <p>
          Already have an account?
          <Link to="/login"> Login Here</Link>
        </p>
      </section>
    </div>
  );
}

export default Register;
