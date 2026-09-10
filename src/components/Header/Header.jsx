import logo from "../../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header({ email, loggedIn, onLogout }) {
  const location = useLocation();
  const isSignup = location.pathname === "/signup";

  return (
    <header className="header page__section">
      <img
        alt="Logotipo Around The U.S."
        className="logo header__logo"
        src={logo}
      />
      <div className="header__auth">
        {loggedIn ? (
          <>
            <span className="header__email">{email}</span>
            <button className="header__logout" type="button" onClick={onLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link className="header__link" to={isSignup ? "/signin" : "/signup"}>
            {isSignup ? "Inicia sesión" : "Regístrate"}
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
