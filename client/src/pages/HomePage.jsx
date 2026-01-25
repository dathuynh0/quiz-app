import { Outlet } from "react-router";
import { Button } from "@/components/ui/button";
import NavigationSideBar from "../components/SideBar/NavigationSideBar";
import { useAuthStore } from "../stores/useAuthStore";

const HomePage = () => {
  const user = useAuthStore.getState().user;
  const { signOut } = useAuthStore();

  return (
    <div className="container mx-auto grid grid-cols-12 min-h-screen">
      <div className="col-span-2 bg-white border-r flex flex-col justify-between">
        <NavigationSideBar />
        <Button onClick={signOut} className="w-full">
          Đăng xuất
        </Button>
      </div>

      {/* thong tin user */}
      <div className="absolute top-0 right-0 px-4 py-2 flex items-center gap-2">
        <div>
          <p>{user.displayName}</p>
          <p className="text-end text-xs font-bold text-gray-500">
            {user.position}
          </p>
        </div>
        <div className="p-2 bg-slate-100 rounded-full">
          <img
            src={
              !user.avatarUrl
                ? "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L3BmLWljb240LWppcjIwNjItcG9yLWwtam9iNzg4LnBuZw.png"
                : user.avatarUrl
            }
            alt="User"
            className="size-8 object-cover"
          />
        </div>
      </div>

      {/* Main content */}
      <div className="col-span-10 p-6 min-w-screen bg-slate-50">
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
