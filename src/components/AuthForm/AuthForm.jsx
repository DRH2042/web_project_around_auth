import { useState } from "react";

export default function AuthForm({
  buttonText,
  isLoading,
  isRegistration = false,
  onSubmit,
  title,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({ email, password });
  }

  return (
    <form className="auth__form" onSubmit={handleSubmit}>
      <h1 className="auth__title">{title}</h1>
      <label className="auth__field">
        <span className="auth__label">Correo electrónico</span>
        <input
          className="auth__input"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Correo electrónico"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label className="auth__field">
        <span className="auth__label">Contraseña</span>
        <input
          className="auth__input"
          name="password"
          type="password"
          autoComplete={isRegistration ? "new-password" : "current-password"}
          placeholder="Contraseña"
          required
          minLength="4"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button className="auth__submit" disabled={isLoading} type="submit">
        {isLoading ? "Procesando..." : buttonText}
      </button>
    </form>
  );
}
