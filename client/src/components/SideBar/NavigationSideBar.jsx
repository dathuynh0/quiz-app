import { Link } from "react-router";
import { BookOpenCheck, House, History, User } from "lucide-react";
import logo from "../../assets/logo-quiz-app.jpg";
import { useState } from "react";
import { useAuthStore } from "../../stores/useAuthStore";

const NavigationSideBar = () => {
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

  const [active, setActive] = useState(0);

  return (
    <div className="w-full">
      {/* logo */}
      <div className="py-2 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="size-12 rounded-xl" />
          <h2 className="text-black text-xl font-medium">Quiz</h2>
        </Link>
      </div>

      <hr className="mt-4" />

      {/* navigation */}
      <div className="mt-8 px-2">
        {data.map((data, index) => {
          return (
            <Link
              key={index}
              to={data.link}
              className={
                active === index
                  ? "flex items-center bg-blue-50 text-blue-600 p-2 mt-2 rounded-lg"
                  : "flex items-center hover:bg-blue-50 p-2 mt-2 rounded-lg"
              }
              onClick={() => {
                setActive(index);
              }}
            >
              {data.icon}
              <p className="pl-4">{data.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationSideBar;
