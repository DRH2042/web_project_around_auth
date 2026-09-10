import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ isCheckingToken, loggedIn, children }) {
  const location = useLocation();

  if (isCheckingToken) {
    return <div className="loader" aria-label="Comprobando sesión" />;
  }

  return loggedIn ? (
    children
  ) : (
    <Navigate to="/signin" replace state={{ from: location }} />
  );
}
