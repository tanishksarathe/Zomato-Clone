import React, { useState } from "react";
import InfoRow from "../FormElements/InfoRow";
import {
  CameraIcon,
  CreditCard,
  FileText,
  Globe,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import EditProfileModalRes from "../modals/EditProfileModalRes";
const RestaurantProfile = () => {

  const [openModalRes, setOpenModalRes] = useState(false);

  // const [openResetPasswordModal, setOpenResetPasswordModal] = useState(false);

  const { user, setUser } = useAuth();

  const [preview, setPreview] = useState("");

  const changePhoto = async (photo) => {
    const form_data = new FormData();

    form_data.append("image", photo); // image file

    try {
      // const res = await api.patch("/user/photo-update", form_data);
      console.log("Response data here :", res.data.data);
      setUser(res.data.data);

      console.log("User", user);
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
    changePhoto(file);
  };

  console.log("User from user Profile : ", user);

  return (
    <>
      <div
        className="min-h-screen flex flex-col py-10 gap-4 items-center justify-center"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div
          className="w-full max-w-4xl rounded-3xl shadow-xl p-8 flex items-center text-center"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          {/* Avatar */}
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mb-4 relative"
            style={{ backgroundColor: "var(--color-accent-soft)" }}
          >
            <img
              src={preview || user?.photo?.url || UserImage}
              alt="avatar"
              className="object-cover rounded-full p-1"
            />

            <div className="bottom-2 left-[75%] border bg-white p-1 rounded-full group flex gap-3 absolute group">
              <label
                htmlFor="imageUpload"
                className="text-(--color-primary) group-hover:text-(--color-secondary)"
              >
                <CameraIcon size={20} />
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
          <div className="flex flex-col w-55">
            <h2
              className="text-2xl font-semibold"
              style={{ color: "var(--color-text-primary)" }}
            >
              {user.fullname}
            </h2>

            <p
              className="text-sm mb-6 text-center justify-center items-center w-45 flex mx-auto"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Active{" "}
              {user?.role === "customer"
                ? "Customer"
                : user?.role === "partner"
                  ? "Rider"
                  : user?.role === "manager"
                    ? "Manager"
                    : ""}
              <br /> Since {user?.createdAt?.slice(0, 4)}
            </p>
          </div>

          {/* Info Section */}
          <div className="w-90 space-y-4">
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
          <div className="flex gap-4 px-2 flex-col justify-center items-start">
            <button
              onClick={() => setOpenModalRes(true)}
              className="px-3 py-2 w-30 rounded-xl font-semibold transition"
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
            <button
              // onClick={() => setOpenResetPasswordModal(true)}
              className=" px-3 py-2 rounded-xl font-semibold transition"
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
              Reset Password
            </button>
          </div>
        </div>
        <div
          className="w-full max-w-4xl rounded-3xl shadow-xl p-8 space-y-6"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          {/* ===== BASIC INFO ===== */}
          <div className="grid grid-cols-2 gap-4">
            <InfoRow
              icon={User}
              label="Role"
              value={
                user?.role === "customer"
                  ? "Customer"
                  : user?.role === "partner"
                    ? "Delivery Partner"
                    : user?.role === "manager"
                      ? "Restraunt Manager"
                      : ""
              }
            />
              <InfoRow icon={User} label="Restaurant Name" value={user?.restaurantName} />
            <InfoRow
              icon={User}
              label="Gender"
              value={
                user?.gender === "male"
                  ? "Male"
                  : user?.gender === "female"
                    ? "Female"
                    : ""
              }
            />
            <InfoRow icon={User} label="Date of Birth" value={user?.dob} />
          </div>

          {/* ===== ADDRESS ===== */}
          <div className="space-y-3">
            <h3
              className="text-sm font-semibold"
              style={{ color: "var(--color-text-primary)" }}
            >
              Address
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <InfoRow icon={MapPin} label="City" value={user?.city} />
              <InfoRow icon={MapPin} label="State" value={user?.state} />
              <InfoRow icon={MapPin} label="PIN Code" value={user?.pin} />
            </div>

            <InfoRow icon={MapPin} label="Full Address" value={user?.address} />
          </div>

          {/* ===== GEOLOCATION ===== */}
          <div className="space-y-3">
            <h3
              className="text-sm font-semibold"
              style={{ color: "var(--color-text-primary)" }}
            >
              Geolocation
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <InfoRow
                icon={Globe}
                label="Latitude"
                value={user?.geolocation?.lat}
              />
              <InfoRow
                icon={Globe}
                label="Longitude"
                value={user?.geolocation?.lon}
              />
            </div>
          </div>

          {/* ===== DOCUMENTS ===== */}
          <div className="space-y-3">
            <h3
              className="text-sm font-semibold"
              style={{ color: "var(--color-text-primary)" }}
            >
              Documents
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <InfoRow
                icon={FileText}
                label="UIDAI"
                value={user?.documents?.uidai}
              />
              <InfoRow
                icon={FileText}
                label="PAN"
                value={user?.documents?.pan}
              />
            </div>
          </div>

          {/* ===== PAYMENT DETAILS ===== */}
          <div className="space-y-3">
            <h3
              className="text-sm font-semibold"
              style={{ color: "var(--color-text-primary)" }}
            >
              Payment Details
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <InfoRow
                icon={CreditCard}
                label="UPI ID"
                value={user?.paymentDetails?.upi}
              />
              <InfoRow
                icon={CreditCard}
                label="IFSC Code"
                value={user?.paymentDetails?.ifs_Code}
              />
              <InfoRow
                icon={CreditCard}
                label="GST No."
                value={user?.paymentDetails?.gst}
              />
              <InfoRow
                icon={CreditCard}
                label="FSSAI Licence No."
                value={user?.paymentDetails?.fssai}
              />
            </div>
            <InfoRow
              icon={CreditCard}
              label="Account Number"
              value={user?.paymentDetails?.account_number}
            />
          </div>
        </div>
      </div>
      {openModalRes && <EditProfileModalRes onClose={() => setOpenModalRes(false)} />}
      {/* {openResetPasswordModal && <ResetPasswordModal onClose={()=> setOpenResetPasswordModal(false)}/>} */}
    </>
  );
};

export default RestaurantProfile;
