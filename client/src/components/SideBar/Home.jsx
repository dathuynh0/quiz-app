import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";

const Home = () => {
  const { user } = useAuthStore();

  return (
    <div className="w-full h-full">
      <div className="p-6 rounded-lg border bg-blue-500 text-white">
        <h1 className="text-3xl font-semibold">
          Quiz App chào mừng {user.displayName}
        </h1>
        <p className="mt-2">Có hơn 200+ bài test đang chờ bạn chinh phục</p>
        <Button
          variant="ghost"
          className="mt-4 bg-white text-blue-500 cursor-pointer"
        >
          <Link className="flex w-full items-center gap-2" to={"/exam"}>
            Thi ngay <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
