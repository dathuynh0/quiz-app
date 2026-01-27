import { NavLink, Link } from "react-router";
import { BookOpenCheck, House, History, User, LogOutIcon } from "lucide-react";
import logo from "../../assets/logo-quiz-app.jpg";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "../../stores/useAuthStore";

const NavigationSideBar = () => {
  const { signOut } = useAuthStore();

  const data = [
    {
      link: "/",
      icon: <House />,
      name: "Trang chủ",
    },
    {
      link: "/exam",
      icon: <BookOpenCheck />,
      name: "Kỳ thi",
    },
    {
      link: "/history",
      icon: <History />,
      name: "Lịch sử",
    },
    {
      link: "/user",
      icon: <User />,
      name: "Hồ sơ",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col z-50">
      {/* logo */}
      <div className="py-2 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="size-12 rounded-xl" />
          <h2 className="text-black text-xl font-medium">Quiz App</h2>
        </Link>
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
          className="w-full bg-gray-300 mt-4"
        >
          <LogOutIcon />
          Đăng xuất
        </Button>
      </div>
    </div>
  );
};

export default NavigationSideBar;
