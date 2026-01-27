import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import EditProfileModal from "../modals/EditProfileModal";
import { CameraIcon, Mail, Phone } from "lucide-react";
import UserImage from "../../assets/image.png";
import api from "../../config/API";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [openModal, setOpenModal] = useState(false);

  const { user, setUser } = useAuth();

  // const [photo, setPhoto] = useState(""); // jo backend tk photo lekr jaaegi

  const [preview, setPreview] = useState("");

  
  const changePhoto = async (photo) => {
    const form_data = new FormData();
    
    form_data.append("image", photo); // image file
    form_data.append("imageURL", preview); //image URL
    
    try {
      const res = await api.patch("/user/photo-update", form_data);
      console.log("Response data here :",res.data.data);
      setUser(res.data.data);
      
      console.log("User",user);
      sessionStorage.setItem("GrabMyMeal User", JSON.stringify(res.data.data));
      
      toast.success(res?.data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    const photoUrl = URL.createObjectURL(file);

    setPreview(photoUrl);
  
      setPhoto(file);
      changePhoto(file);
    
  };

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
            className="w-24 h-24 rounded-full flex items-center justify-center mb-4 relative"
            style={{ backgroundColor: "var(--color-accent-soft)" }}
          >
            <img
              src={preview || user.photo.url || UserImage}
              alt="avatar"
              className="object-cover"
            />

            <div className="bottom-2 left-[75%] border bg-white p-2 rounded-full group flex gap-3 absolute group">
              <label
                htmlFor="imageUpload"
                className="text-(--color-primary) group-hover:text-(--color-secondary)"
              >
                <CameraIcon />
              </label>
              <input
                type="file"
                id="imageUpload"
                className="hidden"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </div>
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
              (e.currentTarget.style.backgroundColor = "var(--color-primary)")
            }
          >
            Edit Profile
          </button>
        </div>
      </div>
      {openModal && <EditProfileModal onClose={() => setOpenModal(false)} />}
    </>
  );
};

export default UserProfile;
