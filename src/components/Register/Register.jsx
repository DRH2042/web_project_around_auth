import { Navigate, Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm.jsx";

export default function Register({ isLoading, loggedIn, onRegister }) {
  if (loggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="auth page__section">
      <AuthForm
        buttonText="Regístrate"
        isLoading={isLoading}
        isRegistration
        onSubmit={onRegister}
        title="Regístrate"
      />
      <p className="auth__caption">
        ¿Ya eres miembro?{" "}
        <Link className="auth__link" to="/signin">
          Inicia sesión aquí
        </Link>
      </p>
    </main>
  );
}
