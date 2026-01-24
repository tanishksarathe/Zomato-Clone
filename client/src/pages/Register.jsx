import { User, Mail, Phone, Lock, Send, XCircle } from "lucide-react";
import { useState } from "react";
import api from "../config/API";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState({});

  const navigate = useNavigate();

  const [details, setDetails] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    role:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let Error = {};

    if (details.fullname.length < 3) {
      Error.fullname = "Name should be More Than 3 Characters";
    } else {
      if (!/^[A-Za-z ]+$/.test(details.fullname)) {
        Error.fullname = "Only Contain A-Z , a-z and space";
      }
    }

    if (
      !/^[\w\.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co.in)$/.test(
        details.email
      )
    ) {
      Error.email = "Use Proper Email Format";
    }

    if(!details.role) Error.role = "Please choose any one"

    if (!/^[6-9]\d{9}$/.test(details.phone)) {
      Error.phone = "Only Indian Mobile Number allowed";
    }

    setValidationError(Error);

    return Object.keys(Error).length > 0 ? false : true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      setLoading(false);
      toast.error("Fill the from correctly");
      return;
    }
    try {
      const response = await api.post("/auth/register", details);

      toast.success(response.data.message);

    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
      handleReset();
      setLoading(false);
    }

  };

  const handleReset = () => {
    setDetails({
      fullname: "",
      email: "",
      password: "",
      phone: "",
      role:""
    });
  };

  return (
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
            className="text-2xl font-semibold"
            style={{ color: "var(--color-text-primary)" }}
          >
            Create Account
          </h2>
          <p
            className="text-sm mt-2"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Register to get started
          </p>
        </div>

        {/* Form */}
        <form
          className="space-y-5 mb-5"
          onSubmit={handleSubmit}
          onReset={handleReset}
        >

           <div>
            <label
              className="block text-sm mb-1 font-semibold"
              style={{ color: "var(--color-text-secondary)" }}
            >
              I am
            </label>
            <div
              className="flex items-center gap-3 rounded-xl px-4 py-3 border focus-within:ring-2"
              style={{
                backgroundColor: "var(--color-background)",
                borderColor: "var(--color-accent-soft)",
                "--tw-ring-color": "var(--color-secondary)",
              }}
            >
              <input
                type="radio"
                placeholder="Enter your email"
                name="role"
                id="manager"
                value={'manager'}
                checked={details.role === "manager"}
                onChange={handleChange}
                className="bg-transparent w-full outline-none"
                style={{ color: "var(--color-text-primary)" }}
              />
              <label htmlFor="manager" className="text-sm">Restaurant Manager</label>
              <input
                type="radio"
                name="role"
                id="partner"
                value={'partner'}
                checked={details.role === "partner"}
                onChange={handleChange}
                className="bg-transparent w-full outline-none"
                style={{ color: "var(--color-text-primary)" }}
              />
              <label htmlFor="partner" className="text-sm">Delivery Partner</label>
              <input
                type="radio"
                name="role"
                id="customer"
                value={'customer'}
                checked={details.role === "customer"}
                onChange={handleChange}
                className="bg-transparent w-full outline-none"
                style={{ color: "var(--color-text-primary)" }}
              />
              <label htmlFor="customer" className="text-sm">Customer</label>
            </div>
            <div className="text-red-600 text-[12px]">
              {validationError && validationError.role}
            </div>
          </div>

          {/* Name */}
          <div>
            <label
              className="block text-sm mb-1"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Full Name
            </label>
            <div
              className="flex items-center gap-3 rounded-xl px-4 py-3 border focus-within:ring-2"
              style={{
                backgroundColor: "var(--color-background)",
                borderColor: "var(--color-accent-soft)",
                "--tw-ring-color": "var(--color-secondary)",
              }}
            >
              <User
                className="w-5 h-5"
                style={{ color: "var(--color-secondary)" }}
              />
              <input
                type="text"
                placeholder="Enter your name"
                name="fullname"
                value={details.fullname}
                onChange={handleChange}
                className="bg-transparent w-full outline-none placeholder-opacity-70"
                style={{
                  color: "var(--color-text-primary)",
                }}
              />
            </div>
            <div className="text-red-600 text-[12px]">
              {validationError && validationError.fullname}
            </div>
          </div>

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

          {/* Phone */}
          <div>
            <label
              className="block text-sm mb-1"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Phone Number
            </label>
            <div
              className="flex items-center gap-3 rounded-xl px-4 py-3 border focus-within:ring-2"
              style={{
                backgroundColor: "var(--color-background)",
                borderColor: "var(--color-accent-soft)",
                "--tw-ring-color": "var(--color-secondary)",
              }}
            >
              <Phone
                className="w-5 h-5"
                style={{ color: "var(--color-secondary)" }}
              />
              <input
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                value={details.phone}
                onChange={handleChange}
                className="bg-transparent w-full outline-none"
                style={{ color: "var(--color-text-primary)" }}
              />
            </div>
            <div className="text-red-600 text-[12px]">
              {validationError && validationError.phone}
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
                placeholder="Create a password"
                value={details.password}
                onChange={handleChange}
                className="bg-transparent w-full outline-none"
                style={{ color: "var(--color-text-primary)" }}
              />
            </div>
            <div className="text-red-600 text-[12px]">
              {validationError && validationError.password}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="reset"
              className="flex-1 flex items-center justify-center gap-2 font-medium py-3 rounded-xl transition border hover:scale-[1.1]"
              style={{
                borderColor: "var(--color-primary)",
                color: "var(--color-primary)",
              }}
            >
              <XCircle className="w-4 h-4" />
              Clear
            </button>

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
                (e.currentTarget.style.backgroundColor = "var(--color-primary)")
              }
            >
              <Send className="w-4 h-4" />
              {loading ? "Submitting" : "Submit"}
            </button>
          </div>
        </form>
          <div className="text-center">Already have an account ? <button className="text-blue-700" onClick={() => navigate('/login')}>Login</button></div>
      </div>
    </div>
  );
};

export default Register;
