import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import EditProfileModal from "../modals/EditProfileModal";
import { Mail, Phone, User } from "lucide-react";

const UserProfile = () => {

  const [openModal, setOpenModal] = useState(false);

  const { user } = useAuth();

  return (
    <>
      <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div
        className="w-full max-w-md rounded-3xl shadow-xl p-8 flex flex-col items-center text-center"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        {/* Avatar */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: "var(--color-accent-soft)" }}
        >
          <User
            size={40}
            style={{ color: "var(--color-primary)" }}
          />
        </div>

        {/* Name */}
        <h2
          className="text-2xl font-semibold"
          style={{ color: "var(--color-text-primary)" }}
        >
          {user.fullname}
        </h2>

        <p
          className="text-sm mb-6"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Active User
        </p>

        {/* Info Section */}
        <div className="w-full space-y-4">
          {/* Email */}
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{ backgroundColor: "var(--color-background)" }}
          >
            <Mail size={18} style={{ color: "var(--color-primary)" }} />
            <span
              className="text-sm font-medium"
              style={{ color: "var(--color-text-primary)" }}
            >
              {user.email}
            </span>
          </div>

          {/* Phone */}
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{ backgroundColor: "var(--color-background)" }}
          >
            <Phone size={18} style={{ color: "var(--color-primary)" }} />
            <span
              className="text-sm font-medium"
              style={{ color: "var(--color-text-primary)" }}
            >
              {user.phone}
            </span>
          </div>
        </div>

        {/* Footer Button */}
        <button
        onClick={() => setOpenModal(true)}
          className="mt-6 px-6 py-2 rounded-xl font-semibold transition"
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
          Edit Profile
        </button>
      </div>
    </div>
    {openModal && <EditProfileModal onClose={() => setOpenModal(false)}/>}
    </>
  );
};

export default UserProfile;
