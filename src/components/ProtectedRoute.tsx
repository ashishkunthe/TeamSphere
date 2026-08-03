import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../axios/axios";

import { backendUrl } from "../backendBaseUrl";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get(`${backendUrl}/auth/me`, {
        withCredentials: true,
      })
      .then(() => {
        setAuthenticated(true);
      })
      .catch(() => {
        setAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
