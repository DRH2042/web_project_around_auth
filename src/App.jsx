import logo from "./images/logo.svg";
import avatar from "./images/avatar.jpg";

function App() {
  return (
    <div className="page__content">
      <header className="header page__section">
        <img
          alt="Logotipo Around The U.S."
          className="logo header__logo"
          src={logo}
        />
      </header>

      <main className="content">
        <section className="profile page__section">
          <img className="profile__image" src={avatar} alt="Avatar" />

          <div className="profile__info">
            <h1 className="profile__title">Jacques Cousteau</h1>
            <button
              aria-label="Editar perfil"
              className="profile__edit-button"
              type="button"
            />
            <p className="profile__description">Explorador</p>
          </div>

          <button
            aria-label="Agregar tarjeta"
            className="profile__add-button"
            type="button"
          />
        </section>

        <section className="cards page__section">
          <ul className="cards__list"></ul>
        </section>
      </main>

      <footer className="footer page__section">
        <p className="footer__copyright">© 2025 Around The U.S.</p>
      </footer>
    </div>
  );
}

export default App;
