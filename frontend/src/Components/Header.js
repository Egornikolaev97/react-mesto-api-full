import logo from "../images/header-logo.svg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React from "react";

const Header = ({
  loggedIn,
  handleLogOut,
  userEmail,
  isBurgerMenuOpen,
  handleBurgerClick,
}) => {
  const location = useLocation();

  const HeaderLink = () => {
    return (
      <Link
        to={location.pathname === "/signin" ? "/signup" : "/signin"}
        className="header__button"
      >
        {location.pathname === "/signin" ? "Регистрация" : "Вход"}
      </Link>
    );
  };

  const HeaderNav = () => {
    return (
      <nav className="header__nav">
        <p className="header__email">{userEmail}</p>
        <button className="header__exit" onClick={handleLogOut}>
          Выйти
        </button>
      </nav>
    );
  };

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип сайта" />
      {loggedIn ? <HeaderNav /> : <HeaderLink />}
      <button
        className={`burger-menu__button
        ${isBurgerMenuOpen && "burger-menu__button_active"}
        ${
          (location.pathname === "/signin" ||
            location.pathname === "/signup") &&
          "burger-menu__button_hidden"
        }`}
        type="button"
        onClick={handleBurgerClick}
      ></button>
    </header>
  );
};
export default Header;

