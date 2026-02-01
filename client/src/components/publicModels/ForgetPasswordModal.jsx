import { X } from "lucide-react";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from '../../config/API'

const ForgetPasswordModal = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const [details, setDetails] = useState({
    email: "",
    otp: "",
    newPassword: "",
    cnfPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let response;

    try {
      if (isOTPSent) {

        console.log("OTP entered by user : ",details.otp)

        response = await api.post("/auth/verifyOtp", details);

        toast.success(response?.data?.message);

        setIsOtpVerified(true);

        if (isOtpVerified) {
        
          //
          //
          //

          console.log("OTP already verified,, please update your password");
        }
      } else {
        response = await api.post("/auth/genOtp", details);
        toast.success(response?.data?.message);
        setIsOTPSent(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unknown Error");
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
                Forget Password
              </h2>
              <p
                className="text-center mb-6"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Update your Password here....
              </p>

              {/* Form */}
              <form className="w-full space-y-6" onSubmit={handleSubmit}>
                {/* ===== BASIC INFO ===== */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-(--color-text-secondary)">
                    Enter Your Email
                  </label>
                  <input
                    type={"email"}
                    name="email"
                    value={details.email}
                    className="rounded-xl px-4 py-3 text-sm outline-none"
                    style={{
                      backgroundColor: "var(--color-background)",
                      color: "var(--color-text-primary)",
                    }}
                    onChange={handleChange}
                    disabled={isOTPSent}
                  />
                  {isOTPSent && (
                    <>
                      <label className="text-xs font-medium text-(--color-text-secondary)">
                        Enter Your OTP
                      </label>
                      <input
                        type={"text"}
                        name="otp"
                        placeholder="Enter OTP recieved in email"
                        value={details.otp}
                        className="rounded-xl px-4 py-3 text-sm outline-none"
                        style={{
                          backgroundColor: "var(--color-background)",
                          color: "var(--color-text-primary)",
                        }}
                        onChange={handleChange}
                      />
                    </>
                  )}
                  {isOTPSent && isOtpVerified && (
                    <>
                      <label className="text-xs font-medium text-(--color-text-secondary)">
                        New Password
                      </label>
                      <input
                        type={"password"}
                        name="newPassword"
                        placeholder="Enter OTP recieved in email"
                        value={details.newPassword}
                        className="rounded-xl px-4 py-3 text-sm outline-none"
                        style={{
                          backgroundColor: "var(--color-background)",
                          color: "var(--color-text-primary)",
                        }}
                        onChange={handleChange}
                      />
                      <label className="text-xs font-medium text-(--color-text-secondary)">
                        Confirm New Password
                      </label>
                      <input
                        type={"password"}
                        name="cnfPassword"
                        placeholder="Enter OTP recieved in email"
                        value={details.cnfPassword}
                        className="rounded-xl px-4 py-3 text-sm outline-none"
                        style={{
                          backgroundColor: "var(--color-background)",
                          color: "var(--color-text-primary)",
                        }}
                        onChange={handleChange}
                        // dont make the button enable untill both passwords same
                      />
                    </>
                  )}
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
                  {loading ? (
                    <>
                      <span className="animate-spin transition-all">C</span> Loading...
                    </>
                  ) : isOTPSent ? (
                    isOtpVerified ? (
                      "Update Password"
                    ) : (
                      "Verify OTP"
                    )
                  ) : (
                    "Sent OTP"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPasswordModal;
