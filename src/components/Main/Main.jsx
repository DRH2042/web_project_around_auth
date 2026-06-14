import avatar from "../../images/avatar.jpg";

function Main() {
  return (
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
  );
}

export default Main;
