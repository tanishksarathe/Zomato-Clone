import logo from "../assets/ChatGPT Image Jan 11, 2026, 05_46_29 PM.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Header = () => {
  const navigate = useNavigate();
  const { user, isLogin } = useAuth();

  const handleNavigate=()=>{
    switch (user.data.role) {
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
  }

  return (
    <div>
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
            <div onClick={handleNavigate} className="text-black cursor-pointer">{user.fullname}</div>
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
