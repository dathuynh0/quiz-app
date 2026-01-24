import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";
import { useEffect, useState } from "react";

const ProtectedPage = () => {
  const { accessToken, loading, user, refresh, fetchUser } = useAuthStore();
  const [starting, setStarting] = useState(true);

  const init = async () => {
    if (!accessToken) {
      await refresh();
    }

    if (accessToken && !user) {
      await fetchUser();
    }

    setStarting(false);
  };

  useEffect(() => {
    init();
  }, []);

  if (loading || starting) {
    return (
      <div className="min-h-screen min-w-screen flex items-center justify-center">
        <p>Đang tải trang...</p>
      </div>
    );
  }

  if (!accessToken) {
    return <Navigate to={"/signin"} replace />;
  }

  return <Outlet></Outlet>;
};

export default ProtectedPage;
