import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogOut } from "../util/HandleUser";
import AuthContext from "../features/authProvider";
import { MdOutlineLogout } from "react-icons/md";

function Header() {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  console.log(auth);
  const logOutHandler = () => {
    try {
      handleLogOut();
      setAuth({
        user: null,
        isError: false,
        isLoading: false,
        isSuccess: false,
        message: "",
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">EZ To-do List</Link>
      </div>
      <ul>
        {auth.user !== null ? (
          <li>
            <button onClick={logOutHandler} className="link_Button">
              Log Out
              <MdOutlineLogout className="header-icon" />
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
