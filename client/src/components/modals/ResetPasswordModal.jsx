import { X } from "lucide-react";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../config/API";
import { useAuth } from "../../context/AuthContext";

const ResetPasswordModal = ({ onClose }) => {
  
  const [loading, setLoading] = useState(false);

  const {user, setUser} = useAuth();

  const [details, setDetails] = useState({
    oldPassword: "",
    newPassword: "",
    cnfPassword: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await api.patch("/user/reset-password", details);

      setUser(response.data.data);
      sessionStorage.setItem("IntervaAI", JSON.stringify(response.data.data));
      
      toast.success(response?.data?.message);
      onClose();
    
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unknwon error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bg-black/80 inset-0 flex items-center justify-center">
        <div className="bg-white max-h-[85vh] w-5xl overflow-y-auto z-100">
          <button
            className="absolute right-0 top-0 text-white"
            onClick={() => onClose()}
          >
            <X />
          </button>
          <div
            className="min-h-screen flex items-center relative justify-center"
            style={{ backgroundColor: "var(--color-background)" }}
          >
            <div
              className="w-full max-w-lg rounded-2xl shadow-xl p-8"
              style={{ backgroundColor: "var(--color-surface)" }}
            >
              {/* Header */}
              <h2
                className="text-3xl font-bold text-center mb-2"
                style={{ color: "var(--color-text-primary)" }}
              >
                Reset Password
              </h2>
              <p
                className="text-center mb-6"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Update your Password
              </p>

              {/* Form */}
              <form className="w-full space-y-6" onSubmit={handleSubmit}>
                {/* ===== BASIC INFO ===== */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-(--color-text-secondary)">
                    Old Password
                  </label>
                  <input
                    type={"password"}
                    name="oldPassword"
                    value={details.oldPassword}
                    className="rounded-xl px-4 py-3 text-sm outline-none"
                    style={{
                      backgroundColor: "var(--color-background)",
                      color: "var(--color-text-primary)",
                    }}
                    onChange={handleChange}
                  />
                  <label className="text-xs font-medium text-(--color-text-secondary)">
                    New Password
                  </label>
                  <input
                    type={"password"}
                    name="newPassword"
                    value={details.newPassword}
                    className={`rounded-xl px-4 py-3 text-sm outline-none border ring ${details.cnfPassword !== "" && details.newPassword === details.cnfPassword ? "ring-green-700" : "ring-red-700"}`}
                    style={{
                      backgroundColor: "var(--color-background)",
                      color: "var(--color-text-primary)",
                    }}
                    onChange={handleChange}
                  />
                  <label
                    className={`text-xs font-medium text-(--color-text-secondary)`}
                  >
                    Confirm New Password
                  </label>
                  <input
                    type={"password"}
                    name="cnfPassword"
                    value={details.cnfPassword}
                    className={`rounded-xl px-4 py-3 text-sm outline-none border ring ${details.newPassword !== "" && details.newPassword === details.cnfPassword ? "ring-green-700" : "ring-red-700"}`}
                    style={{
                      backgroundColor: "var(--color-background)",
                      color: "var(--color-text-primary)",
                    }}
                    onChange={handleChange}
                  />
                </div>
                {/* ===== SUBMIT ===== */}
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-full py-3 rounded-xl font-semibold transition"
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
                  {loading? "Updating..." :"Update Password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordModal;
