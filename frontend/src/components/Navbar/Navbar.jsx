import React, { useContext, useEffect } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faShoppingCart,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { assets } from "../../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const Navbar = ({ setShowLogin }) => {
  const location = useLocation();

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const showToast = () => {
    if (getTotalCartAmount() === 0) {
      toast.warning("Cart is empty");
    }
  };

  useEffect(() => {}, [token]);

  return (
    <div className="navbar">
      <Link
        to="/"
        onClick={() => {
          navigate("/");
          window.location.reload();
        }}
      >
        <img src={assets.logo} className="logo" alt="logo" />
      </Link>
      {location.pathname !== "/order" ? (
        <>
          <ul className="navbar-menu">
            <Link to="/">Home</Link>

            {location.pathname !== "/cart" ? (
              <>
                <a href="/#explore-collection">Collection</a>
                <a href="/#about-us">About Us</a>
                <a href="#footer">Contact Us</a>
              </>
            ) : null}
          </ul>
          <div className="navbar-right">
            <div className="navbar-icon">
              {location.pathname !== "/cart" ? (
                <>
                  <Link to={getTotalCartAmount() === 0 ? `/` : `/cart`}>
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      onClick={showToast}
                    />
                  </Link>
                  <div
                    className={getTotalCartAmount() === 0 ? "" : "dot"}
                  ></div>
                </>
              ) : null}
            </div>
            {!token ? (
              <button
                onClick={() => {
                  setShowLogin(true);
                }}
              >
                Sign in
              </button>
            ) : (
              <div className="navbar-profile">
                <FontAwesomeIcon className="icon" icon={faUser} />
                <ul className="nav-profile-dropdown">
                  <li onClick={() => navigate("/myorders")}>
                    <FontAwesomeIcon className="icon" icon={faShoppingBag} />
                    <p>Orders</p>
                  </li>
                  <hr />
                  <li onClick={logout}>
                    <FontAwesomeIcon className="icon" icon={faSignOut} />
                    <p>Logout</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Navbar;
