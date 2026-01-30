import NavigationAdmin from "../components/Admin/NavigationAdmin";
import { useAuthStore } from "../stores/useAuthStore";
import { Outlet } from "react-router";

const Admin = () => {
  const { user } = useAuthStore();

  if (user.position !== "Admin") {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <p>Bạn không có quyền...</p>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen grid grid-cols-12">
      {/* navigation */}
      <div className="col-span-2 border-r">
        <NavigationAdmin />
      </div>

      {/* content */}
      <div className="p-6 col-span-10 w-full">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Admin;
