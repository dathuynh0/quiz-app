import { useAuthStore } from "@/stores/useAuthStore";
import { useExamStore } from "@/stores/useExamStore";
import { Button } from "@/components/ui/button";
import { History, LayoutDashboard, Pen, Plus } from "lucide-react";
import LineChart from "../Exam/LineChart";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import UpdateUser from "./UpdateUser";

const UserInfo = () => {
  const user = useAuthStore((s) => s.user);
  const { historyExam, getHistoryExam } = useExamStore();
  const [isOpenUpdateUser, setIsOpenUpdateUser] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      await getHistoryExam();
    };

    fetch();
  }, [getHistoryExam]);

  return (
    <div>
      <div className="mx-6 flex items-center justify-between">
        {/* header */}
        <div className="flex items-center gap-4">
          <img
            className="size-18 rounded-full object-cover bg-gray-400"
            src={
              !user.avatarUrl
                ? "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L3BmLWljb240LWppcjIwNjItcG9yLWwtam9iNzg4LnBuZw.png"
                : user.avatarUrl
            }
            alt=""
          />
          <div>
            <h2 className="text-xl font-bold">{user.displayName}</h2>
            <span className="text-sm text-gray-500">{user.position}</span>
          </div>
        </div>
        <div className="space-x-2 flex items-center">
          {user.position === "Admin" && (
            <Button variant="blue" className="cursor-pointer">
              <Link className="flex items-center gap-1" to="/admin/category">
                <LayoutDashboard />
                Trang quản trị
              </Link>
            </Button>
          )}
          {user.position !== "Student" ? (
            <>
              <Button variant="blue" className="cursor-pointer">
                <Link
                  className="flex items-center gap-1"
                  to="/exam/created-exam"
                >
                  <History />
                  Các bài thi đã tạo
                </Link>
              </Button>
              <Button variant="blue" className="cursor-pointer">
                <Link
                  className="flex items-center gap-1"
                  to="/exam/create-exam"
                >
                  <Plus />
                  Tạo bài thi
                </Link>
              </Button>
            </>
          ) : (
            ""
          )}
          <Button
            onClick={() => setIsOpenUpdateUser(true)}
            variant="blue"
            className="cursor-pointer"
          >
            <Pen />
            Sửa hồ sơ
          </Button>
          <UpdateUser
            isOpen={isOpenUpdateUser}
            isClose={() => setIsOpenUpdateUser(false)}
            user={user}
          />
        </div>
      </div>

      <div className="col-span-7">
        <LineChart history={historyExam} />
      </div>
    </div>
  );
};

export default UserInfo;
