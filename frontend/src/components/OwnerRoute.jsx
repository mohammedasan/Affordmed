import { Navigate } from "react-router-dom";

function OwnerRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "owner") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default OwnerRoute;
