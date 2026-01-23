import { Lock, Mail, Phone, Save, User, X } from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/API";
import toast from "react-hot-toast";

const EditProfileModal = ({ onClose }) => {
  const { user, setUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const [details, setDetails] = useState({
    fullname: user.fullname,
    email: user.email,
    phone: user.phone,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Edit Profile", details);

      const response = await api.put("/user/update", details);

      console.log(response.data);

      sessionStorage.setItem(
        "GrabMyMeal User",
        JSON.stringify(response.data.data),
      );
      setUser(response.data.data);
      toast.success("User Updated Successfully");
      onClose();
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="fixed bg-black/80 inset-0 flex items-center justify-center">
        <div className="bg-white max-h-[85vh] w-5xl overflow-y-auto z-100">
          <div
            className="min-h-screen flex items-center justify-center"
            style={{ backgroundColor: "var(--color-background)" }}
          >
            <button
              className="absolute right-0 top-0 text-white"
              onClick={() => onClose()}
            >
              <X />
            </button>
            <div
              className="w-full max-w-lg rounded-2xl shadow-xl p-8"
              style={{ backgroundColor: "var(--color-surface)" }}
            >
              {/* Header */}
              <h2
                className="text-3xl font-bold text-center mb-2"
                style={{ color: "var(--color-text-primary)" }}
              >
                Edit Profile
              </h2>
              <p
                className="text-center mb-6"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Update your personal information
              </p>

              {/* Form */}
              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Name */}
                <div>
                  <label
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Full Name
                  </label>
                  <div
                    className="mt-1 flex items-center gap-2 rounded-lg border px-3 py-2"
                    style={{ borderColor: "var(--color-accent-soft)" }}
                  >
                    <User size={18} style={{ color: "var(--color-primary)" }} />
                    <input
                      type="text"
                      name="fullname"
                      value={details.fullname}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none"
                      style={{ color: "var(--color-text-primary)" }}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Email Address
                  </label>
                  <div
                    className="mt-1 flex items-center gap-2 rounded-lg border px-3 py-2"
                    style={{ borderColor: "var(--color-accent-soft)" }}
                  >
                    <Mail size={18} style={{ color: "var(--color-primary)" }} />
                    <input
                      type="email"
                      name="email"
                      value={details.email}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none"
                      style={{ color: "var(--color-text-primary)" }}
                      disabled
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Phone Number
                  </label>
                  <div
                    className="mt-1 flex items-center gap-2 rounded-lg border px-3 py-2"
                    style={{ borderColor: "var(--color-accent-soft)" }}
                  >
                    <Phone
                      size={18}
                      style={{ color: "var(--color-primary)" }}
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={details.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none"
                      style={{ color: "var(--color-text-primary)" }}
                    />
                  </div>
                </div>

                {/* Password */}

                {/* <div>
                  <label
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    New Password
                  </label>
                  <div
                    className="mt-1 flex items-center gap-2 rounded-lg border px-3 py-2"
                    style={{ borderColor: "var(--color-accent-soft)" }}
                  >
                    <Lock size={18} style={{ color: "var(--color-primary)" }} />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-transparent outline-none"
                      style={{ color: "var(--color-text-primary)" }}
                    />
                  </div>
                </div> */}

                {/* Save Button */}
                <button
                  type="submit"
                  onSubmit={handleSubmit}
                  className="w-full flex items-center justify-center gap-2 rounded-lg py-3 font-semibold transition"
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
                  <Save size={18} />
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfileModal;
