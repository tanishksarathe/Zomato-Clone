import { Lock, Mail, Send } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/API.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import ForgetPasswordModal from "../components/publicModels/ForgetPasswordModal.jsx";

const Login = () => {
  const { user, setUser, role, setIsLogin, setRole } = useAuth();

  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const [openForgetPasswordModel, setOpenForgetPasswordModel] = useState(false);

  const [validationError, setValidationError] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    let Error = {};

    if (
      !/^[\w\.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co.in)$/.test(
        details.email,
      )
    ) {
      Error.email = "Use Proper Email Format";
    }

    setValidationError(Error);

    return Object.keys(Error).length > 0 ? false : true;
  };

  const handleReset = () => {
    setDetails({
      email: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validate()) {
      setLoading(false);
      toast.error("Fill the from correctly");
      return;
    }

    try {
      const response = await api.post("/auth/login", details);
      console.log(response.data);
      setUser(response.data.data);
      setIsLogin(true);
      sessionStorage.setItem(
        "GrabMyMeal User",
        JSON.stringify(response.data.data),
      );
      toast.success("Login Successful");

      switch (role) {
        case "manager":
          setRole(user.role);
          navigate("/restaurant-dashboard");
          break;
        case "partner":
          setRole(user.role);
          navigate("/rider-dashboard");
          break;
        case "admin":
          setRole(user.role);
          navigate("/admin-dashboard");
          break;
        case "customer":
          setRole(user.role);
          navigate("/user-dashboard");
          break;

        default:
          break;
      }

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unknown error");
    } finally {
      handleReset();
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div
          className="w-full max-w-md rounded-2xl p-8 shadow-xl border"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-accent-soft)",
          }}
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <h2
              className="text-3xl font-semibold"
              style={{ color: "var(--color-text-primary)" }}
            >
              Login
            </h2>
            {/* <p
            className="text-sm mt-2"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Register to get started
          </p> */}
          </div>

          {/* Form */}
          <form className="space-y-5 mb-5" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <label
                className="block text-sm mb-1"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Email
              </label>
              <div
                className="flex items-center gap-3 rounded-xl px-4 py-3 border focus-within:ring-2"
                style={{
                  backgroundColor: "var(--color-background)",
                  borderColor: "var(--color-accent-soft)",
                  "--tw-ring-color": "var(--color-secondary)",
                }}
              >
                <Mail
                  className="w-5 h-5"
                  style={{ color: "var(--color-secondary)" }}
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={details.email}
                  onChange={handleChange}
                  className="bg-transparent w-full outline-none"
                  style={{ color: "var(--color-text-primary)" }}
                />
              </div>
              <div className="text-red-600 text-[12px]">
                {validationError && validationError.email}
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-sm mb-1"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Password
              </label>
              <div
                className="flex items-center gap-3 rounded-xl px-4 py-3 border focus-within:ring-2"
                style={{
                  backgroundColor: "var(--color-background)",
                  borderColor: "var(--color-accent-soft)",
                  "--tw-ring-color": "var(--color-secondary)",
                }}
              >
                <Lock
                  className="w-5 h-5"
                  style={{ color: "var(--color-secondary)" }}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={details.password}
                  onChange={handleChange}
                  className="bg-transparent w-full outline-none"
                  style={{ color: "var(--color-text-primary)" }}
                />
              </div>
              <div className="flex justify-end">
                <button
                type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenForgetPasswordModel(true);
                  }}
                  className="text-blue-800 text-sm cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="text-red-600 text-[12px]">
                {validationError && validationError.password}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4 justify-center items-center">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 font-medium py-3 rounded-xl transition hover:scale-[1.1]"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "#fff",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-primary-hover)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-primary)")
                }
              >
                <Send className="w-4 h-4" />
                {loading ? "Logging In" : "Login"}
              </button>
            </div>
          </form>
          <div className="text-center">
            Don't have an account ?{" "}
            <button
              className="text-blue-700"
              onClick={() => navigate("/register")}
            >
              SignUp
            </button>
          </div>
        </div>
      </div>
      {openForgetPasswordModel && (
        <ForgetPasswordModal
          onClose={() => setOpenForgetPasswordModel(false)}
        />
      )}
    </>
  );
};

export default Login;
