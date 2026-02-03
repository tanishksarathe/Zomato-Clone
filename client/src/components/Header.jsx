import logo from "../assets/ChatGPT Image Jan 11, 2026, 05_46_29 PM.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";
import api from "../config/API";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const { user, isLogin, setIsLogin, setUser } = useAuth();

  console.log(user.role);

  const handleNavigate = () => {
    switch (user.role) {
      case "manager":
        navigate("/restaurant-dashboard");
        break;
      case "partner":
        navigate("/rider-dashboard");
        break;
      case "admin":
        navigate("/admin-dashboard");
        break;
      case "customer":
        navigate("/user-dashboard");
        break;

      default:
        break;
    }
  };

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout"); // backend bhraman to clear cookie
      setUser(""); //auth clear
      setIsLogin(false); // auth login clear
      sessionStorage.removeItem("GrabMyMeal User"); // session clear
      toast.success("Logout Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };

  return (
    <div className="sticky top-0 z-10">
      <div className="bg-(--color-primary) flex justify-between items-center px-4 py-2">
        <div>
          <Link to={"/"}>
            <img src={logo} alt="logo" className="h-15 w-15 rounded-full" />
          </Link>
        </div>
        <div className="flex justify-around gap-4">
          <Link
            to={"/"}
            className="text-decoration-none text-(--color-accent-soft) hover:text-(--color-text-primary)"
          >
            Home
          </Link>
          <Link
            to={"/about"}
            className="text-decoration-none text-(--color-accent-soft) hover:text-(--color-text-primary)"
          >
            About
          </Link>
          <Link
            to={"/contact"}
            className="text-decoration-none text-(--color-accent-soft) hover:text-(--color-text-primary)"
          >
            Contact
          </Link>
        </div>
        <div className="flex gap-4">
          {isLogin ? (
            <div className="flex justify-center gap-5 items-center">
              <div
                onClick={handleNavigate}
                className="text-black cursor-pointer"
              >
                {user.fullname}
              </div>
              <button
                onClick={handleLogout}
                className="p-2 cursor-pointer rounded-full bg-(--color-secondary) text-(-color-text-primary)"
              >
                <LogOut />
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="bg-(--color-secondary) text-(--color-text-primary) px-4 rounded-lg py-2"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-(--color-secondary) text-(--color-text-primary) px-4 rounded-lg py-2"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
