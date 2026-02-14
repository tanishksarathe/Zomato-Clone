import logo from "../assets/ChatGPT Image Jan 11, 2026, 05_46_29 PM.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";
import api from "../config/API";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useCart } from "../context/cartContext";

const Header = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const isHome = location.pathname === "/";

  const { badge } = useCart();

  const { user, isLogin, setIsLogin, setUser } = useAuth();

  // const [count, setCount] = useState();

  // useEffect(()=>{

  //   let a = localStorage.getItem("AddToCart");

  //   console.log("Count ki kahani", a.length);
  //   console.log("Count ki kahani", a);

  // },[])

  console.log(user?.role);

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
        navigate("/");
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
    <div className="sticky top-0 z-50">
      <div className={`${isHome ? "backdrop-brightness-50":"bg-(--color-surface)"} flex justify-between items-center px-4 py-2`}>
        <div>
          <Link to={"/"} className="flex gap-2 justify-center items-center">
            <img src={logo} alt="logo" className="h-15 w-15 rounded-full" />{" "}
            <span className={`${isHome ? "text-(--color-surface)":"text-(--color-primary)"} font-bold text-2xl hover:text-(--color-primary-hover)`}>
              GrabMyMeal
            </span>
          </Link>
        </div>
        <div className="flex justify-around gap-4 font-semibold">
          <Link
            to={"/"}
            className={`${isHome ? "text-(--color-surface)":"text-(--color-primary)"} text-decoration-none hover:text-(--color-primary-hover)`}
          >
            Home
          </Link>
          <Link
            to={"/about"}
            className={`${isHome ? "text-(--color-surface)":"text-(--color-primary)"} text-decoration-none hover:text-(--color-primary-hover)`}
          >
            About
          </Link>
          <Link
            to={"/contact"}
            className={`${isHome ? "text-(--color-surface)":"text-(--color-primary)"} text-decoration-none hover:text-(--color-primary-hover)`}
          >
            Contact
          </Link>
          <Link
            to={"/restaurants-all"}
            className={`${isHome ? "text-(--color-surface)":"text-(--color-primary)"} text-decoration-none hover:text-(--color-primary-hover)`}
          >
            Restaurants
          </Link>
          <Link
            to={"/add-to-cart"}
            className={`text-decoration-none ${isHome ? "text-(--color-surface)":"text-(--color-primary)"}  hover:text-(--color-primary-hover) relative`}
          >
            Cart
            <span className="absolute bg-(--color-secondary) text-(--color-text-primary) font-bold -top-1 text-[13px] px-1.5 rounded-full">
              {badge}
            </span>
          </Link>
        </div>
        <div className="flex gap-4">
          {isLogin ? (
            <div className="flex justify-center gap-5 items-center">
              <div
                onClick={handleNavigate}
                className="text-(--color-surface) hover:text-(--color-primary-hover) cursor-pointer"
              >
                {user.fullname}
              </div>
              <button
                onClick={handleLogout}
                className="p-2 cursor-pointer rounded-full bg-(--color-primary) hover:bg-(--color-primary-hover) text-(--color-surface)"
              >
                <LogOut />
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="font-semibold text-(--color-surface) px-4 rounded-lg py-2"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-(--color-primary) font-semibold hover:bg-(--color-primary-hover) text-(--color-surface) px-4 rounded-lg py-2"
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
