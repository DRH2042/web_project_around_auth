import { Navigate, Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm.jsx";

export default function Login({ isLoading, loggedIn, onLogin }) {
  if (loggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="auth page__section">
      <AuthForm
        buttonText="Inicia sesión"
        isLoading={isLoading}
        onSubmit={onLogin}
        title="Inicia sesión"
      />
      <p className="auth__caption">
        ¿Aún no eres miembro?{" "}
        <Link className="auth__link" to="/signup">
          Regístrate aquí
        </Link>
      </p>
    </main>
  );
}
