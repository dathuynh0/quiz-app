import { useAuthStore } from "../../stores/useAuthStore";
import {
  ChartColumnStacked,
  LayoutDashboard,
  LogOutIcon,
  Book,
  User,
} from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";

const NavigationAdmin = () => {
  const { user, signOut } = useAuthStore();

  const data = [
    {
      name: "Dashboard",
      link: "/admin/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      name: "Quản lý danh mục",
      link: "/admin/category",
      icon: <ChartColumnStacked />,
    },
    {
      name: "Quản lý kỳ thi",
      link: "/admin/exam",
      icon: <Book />,
    },
    {
      name: "Quản lý người dùng",
      link: "/admin/user",
      icon: <User />,
    },
  ];

  return (
    <div className="w-full h-full flex flex-col z-50">
      {/* logo */}
      <div className="py-2 px-4 flex items-center gap-2">
        <img
          className="size-12 rounded-full object-cover"
          src={
            user.avatarUrl ??
            "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L3BmLWljb240LWppcjIwNjItcG9yLWwtam9iNzg4LnBuZw.png"
          }
          alt=""
        />
        <div>
          <h2 className="font-bold">{user.displayName}</h2>
          <span className="text-xs text-muted-foreground">{user.position}</span>
        </div>
      </div>

      <hr className="mt-4" />

      <div className="mt-8 px-2 flex flex-col h-full justify-between">
        <div>
          {data.map((item, index) => (
            <NavLink
              key={index}
              to={item.link}
              className={
                "flex items-center hover:bg-blue-50 p-2 mt-2 rounded-lg"
              }
            >
              {item.icon}
              <p className="pl-4">{item.name}</p>
            </NavLink>
          ))}
        </div>
        {/* signout */}
        <Button
          onClick={signOut}
          variant="ghost"
          className="w-full cursor-pointer bg-gray-300 mt-4"
        >
          <LogOutIcon />
          Đăng xuất
        </Button>
      </div>
    </div>
  );
};

export default NavigationAdmin;
