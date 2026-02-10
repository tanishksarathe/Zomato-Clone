import { ImagePlus, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Input from "../FormElements/Input";
import api from "../../config/API";
import toast from "react-hot-toast";

const EditProfileModalRes = ({ onClose }) => {
  const { user, setUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const [details, setDetails] = useState({
    fullname: user.fullname,
    email: user.email,
    phone: user.phone,
    cuisine: user.cuisine,
    owner: user?.owner || "",
    description: user?.description || "",
    timing: {
      open: user?.timing?.open || "",
      close: user?.timing?.close || "",
    },
    role: user.role || "N/A",
    dob: user?.dob || "",
    gender: user?.gender || "N/A",
    city: user?.city || "",
    address: user?.address || "",
    state: user?.state || "",
    pin: user?.pin || "",
    restaurantName: user?.restaurantName || "",
    geolocation: {
      lat: user?.geolocation?.lat || "",
      lon: user?.geolocation?.lon || "",
    },
    documents: {
      uidai: user?.documents?.uidai || "",
      pan: user?.documents?.pan || "",
      fssai: user?.documents?.fssai || "",
      gst: user?.documents?.gst || "",
    },
    paymentDetails: {
      upi: user?.paymentDetails?.upi || "",
      ifs_Code: user?.paymentDetails?.ifs_Code || "",
      account_number: user?.paymentDetails?.account_number || "",
    },
  });

  const [preview, setPreview] = useState([]);

  const dishes = useRef(null);

  const handlePhotoChange = async (e) => {
    const file = Array.from(e.target.files);

    setPreview(file.slice(0, 5));
  };

  const fetchLocation = async (e) => {
    e.preventDefault();

    try {
      navigator.geolocation.getCurrentPosition((res) => {
        // console.log(res);

        setDetails({
          ...details,
          geolocation: {
            ...details["geolocation"],
            lat: res.coords.latitude,
            lon: res.coords.longitude,
          },
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (parent, field, value) => {
    setDetails((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      // simple fields
      formData.append("fullname", details.fullname);
      formData.append("email", details.email);
      formData.append("phone", details.phone);
      formData.append("owner", details.owner);
      formData.append("description", details.description);
      formData.append("role", details.role);
      formData.append("dob", details.dob);
      formData.append("gender", details.gender);
      formData.append("city", details.city);
      formData.append("cuisine", details.cuisine);
      formData.append("address", details.address);
      formData.append("state", details.state);
      formData.append("pin", details.pin);
      formData.append("restaurantName", details.restaurantName);

      // timing (nested)
      formData.append("timing", JSON.stringify(details.timing));

      // geolocation (nested)
      formData.append("geolocation", JSON.stringify(details.geolocation));
      // documents (nested)
      formData.append("documents", JSON.stringify(details.documents));

      // payment details (nested)
      formData.append("paymentDetails", JSON.stringify(details.paymentDetails));

      preview.forEach((item) => formData.append("restaurantImages", item));

      const response = await api.put("/restaurant/update", formData);

      console.log(response.data.data);

      sessionStorage.setItem(
        "GrabMyMeal User",
        JSON.stringify(response.data.data),
      );
      setUser(response.data.data);
      toast.success("Restaurant/Manager Updated Successfully");
      onClose();
    } catch (error) {
      console.log(error);
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
                Edit Profile
              </h2>
              <p
                className="text-center mb-6"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Update Restaurant
              </p>

              {/* Form */}
              <form className="w-full space-y-6" onSubmit={handleSubmit}>
                {/* ===== BASIC INFO ===== */}
                <div className="space-y-4">
                  <Input
                    label="fullname"
                    value={details.fullname}
                    name="fullname"
                    onChangeMethod={handleChange}
                  />
                  <Input
                    label="email"
                    value={details.email}
                    name="email"
                    onChangeMethod={handleChange}
                    disabled
                  />
                  <Input
                    label="phone"
                    value={details.phone}
                    name="phone"
                    onChangeMethod={handleChange}
                  />

                  {/* <Input label="Password" type="password" /> */}
                </div>

                {/* ===== ROLE & GENDER ===== */}
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="flex w-fit items-center gap-3 rounded-xl px-4 py-3 border focus-within:ring-2"
                    style={{
                      backgroundColor: "var(--color-background)",
                      borderColor: "var(--color-accent-soft)",
                      "--tw-ring-color": "var(--color-secondary)",
                    }}
                  >
                    <input
                      type="radio"
                      name="role"
                      id="manager"
                      value={"manager"}
                      checked={details.role === "manager"}
                      onChange={handleChange}
                      className="bg-transparent w-full outline-none"
                      style={{ color: "var(--color-text-primary)" }}
                    />
                    <label htmlFor="manager" className="text-sm">
                      Restaurant Manager
                    </label>
                    <input
                      type="radio"
                      name="role"
                      id="partner"
                      value={"partner"}
                      checked={details.role === "partner"}
                      onChange={handleChange}
                      className="bg-transparent w-full outline-none"
                      style={{ color: "var(--color-text-primary)" }}
                    />
                    <label htmlFor="partner" className="text-sm">
                      Delivery Partner
                    </label>
                    <input
                      type="radio"
                      name="role"
                      id="customer"
                      value={"customer"}
                      checked={details.role === "customer"}
                      onChange={handleChange}
                      className="bg-transparent w-full outline-none"
                      style={{ color: "var(--color-text-primary)" }}
                    />
                    <label htmlFor="customer" className="text-sm">
                      Customer
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="flex items-center w-fit gap-3 rounded-xl px-4 py-3 border focus-within:ring-2"
                    style={{
                      backgroundColor: "var(--color-background)",
                      borderColor: "var(--color-accent-soft)",
                      "--tw-ring-color": "var(--color-secondary)",
                    }}
                  >
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value={"male"}
                      checked={details.gender === "male"}
                      onChange={handleChange}
                      className="bg-transparent w-full outline-none"
                      style={{ color: "var(--color-text-primary)" }}
                    />
                    <label htmlFor="male" className="text-sm">
                      Male
                    </label>
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value={"female"}
                      checked={details.gender === "female"}
                      onChange={handleChange}
                      className="bg-transparent w-full outline-none"
                      style={{ color: "var(--color-text-primary)" }}
                    />
                    <label htmlFor="female" className="text-sm">
                      Female
                    </label>
                    <input
                      type="radio"
                      name="gender"
                      id="others"
                      value={"others"}
                      checked={details.gender === "others"}
                      onChange={handleChange}
                      className="bg-transparent w-full outline-none"
                      style={{ color: "var(--color-text-primary)" }}
                    />
                    <label htmlFor="others" className="text-sm">
                      Others
                    </label>
                  </div>
                </div>

                {/* ===== LOCATION ===== */}
                <div className="space-y-4">
                  <Input
                    label="City"
                    value={details.city}
                    name="city"
                    onChangeMethod={handleChange}
                  />
                  <Input
                    label="State"
                    value={details.state}
                    name="state"
                    onChangeMethod={handleChange}
                  />
                  <Input
                    label="PIN Code"
                    value={details.pin}
                    name="pin"
                    onChangeMethod={handleChange}
                  />
                  <Input
                    label="Address"
                    value={details.address}
                    name="address"
                    onChangeMethod={handleChange}
                  />
                  <Input
                    label="Date of Birth"
                    type="date"
                    value={details.dob}
                    name="dob"
                    onChangeMethod={handleChange}
                  />
                </div>

                {/* ===== GEO LOCATION ===== */}
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Latitude"
                    value={details.geolocation.lat}
                    disabled
                  />
                  <Input
                    label="Longitude"
                    value={details.geolocation.lon}
                    disabled
                  />
                </div>

                <button
                  className={`border px-2 py-1 rounded-lg text-sm ${details.geolocation.lat !== "N/A" ? "border-green-500" : "border-red-600"} `}
                  onClick={fetchLocation}
                >
                  {details.geolocation.lon !== "N/A" &&
                  details.geolocation.lat !== "N/A"
                    ? "Fetched"
                    : "Get Live Location"}
                </button>

                {/* ===== MANAGER ONLY ===== */}
                {user.role === "manager" && (
                  <div className="space-y-4">
                    <Input
                      label="Restaurant Name"
                      value={details.restaurantName}
                      name="restaurantName"
                      onChangeMethod={handleChange}
                    />
                    <Input
                      label="About Restaurant"
                      value={details.description}
                      name="description"
                      onChangeMethod={handleChange}
                    />
                    <Input
                      label="Owner"
                      value={details.owner}
                      name="owner"
                      onChangeMethod={handleChange}
                    />
                    <Input
                      label="Cuisine Type"
                      value={details.cuisine}
                      name="cuisine"
                      onChangeMethod={handleChange}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Opens at"
                        type="time"
                        value={details.timing.open}
                        name="timing"
                        onChangeMethod={(e) =>
                          handleNestedChange("timing", "open", e.target.value)
                        }
                      />
                      <Input
                        label="Closes at"
                        type="time"
                        value={details.timing.close}
                        name="timing"
                        onChangeMethod={(e) =>
                          handleNestedChange("timing", "close", e.target.value)
                        }
                      />
                    </div>
                  </div>
                )}

                {/* ===== PAYMENT DETAILS ===== */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-(--color-text-primary)">
                    Payment Details
                  </h3>
                  <Input
                    label="UPI ID"
                    value={details.paymentDetails.upi}
                    name="upi"
                    onChangeMethod={(e) =>
                      handleNestedChange(
                        "paymentDetails",
                        "upi",
                        e.target.value,
                      )
                    }
                  />
                  <Input
                    label="IFSC Code"
                    value={details.paymentDetails.ifs_Code}
                    name="ifs_Code"
                    onChangeMethod={(e) =>
                      handleNestedChange(
                        "paymentDetails",
                        "ifs_Code",
                        e.target.value,
                      )
                    }
                  />
                  <Input
                    label="Account Number"
                    value={details.paymentDetails.account_number}
                    name="account_number"
                    onChangeMethod={(e) =>
                      handleNestedChange(
                        "paymentDetails",
                        "account_number",
                        e.target.value,
                      )
                    }
                  />
                </div>

                {/* ===== DOCUMENTS ===== */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-(--color-text-primary)">
                    Documents
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="GST Number"
                      value={details.documents.gst}
                      name="gst"
                      onChangeMethod={(e) =>
                        handleNestedChange("documents", "gst", e.target.value)
                      }
                    />
                    <Input
                      label="FSSAI License No."
                      value={details.documents.fssai}
                      name="fssai"
                      onChangeMethod={(e) =>
                        handleNestedChange("documents", "fssai", e.target.value)
                      }
                    />
                    <Input
                      label="UIDAI"
                      value={details.documents.uidai}
                      name="uidai"
                      onChangeMethod={(e) =>
                        handleNestedChange("documents", "uidai", e.target.value)
                      }
                    />
                    <Input
                      label="PAN"
                      value={details.documents.pan}
                      name="pan"
                      onChangeMethod={(e) =>
                        handleNestedChange("documents", "pan", e.target.value)
                      }
                    />
                    {/* <Input label="RC" /> */}
                    {/* <Input label="Driving License" /> */}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Dish Images (Max 3) *
                  </label>

                  <div
                    className="border-2 border-dashed border-[#F3C2A6]  rounded-xl p-6 bg-white"
                    onClick={() => dishes.current.click()}
                  >
                    <div className="flex flex-col items-center gap-2 text-center">
                      <ImagePlus size={36} className="text-[#8E1D4F]" />
                      <p className="text-sm text-gray-600">
                        Upload up to 5 images
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        ref={dishes}
                        className="mt-2 text-sm"
                        onChange={handlePhotoChange}
                        hidden
                      />
                    </div>
                  </div>
                  {preview.length !== 0 && (
                    <div className="grid grid-cols-5 p-2 gap-2">
                      {preview.map((item, idx) => (
                        <div key={idx} className="relative">
                          <img
                            src={URL.createObjectURL(item)}
                            alt="images"
                            className="h-40 rounded-md w-40 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setPreview((prev) =>
                                prev.filter((_, i) => i !== idx),
                              )
                            }
                            className="absolute top-0 right-0 bg-white rounded-full m-1 cursor-pointer"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ===== SUBMIT ===== */}
                <button
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

export default EditProfileModalRes;
