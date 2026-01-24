import { useAuthStore } from "../stores/useAuthStore";

const HomePage = () => {
  const { signOut } = useAuthStore();
  const user = useAuthStore((u) => u.user);
  return (
    <div>
      <h1>My name is {user.displayName}</h1>
      <button onClick={signOut}>Đăng xuất</button>
    </div>
  );
};

export default HomePage;
