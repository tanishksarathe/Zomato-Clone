import React, { useState } from "react";
import { MessageSquare, User, Send, Mail } from "lucide-react";
import toast from "react-hot-toast";
import api from "../config/API";

const Contact = () => {
  const [messageData, setMessageData] = useState({
    fullname: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMessageData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth/contactus", messageData);

      console.log(response.data);

    toast.success(response?.data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
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
          className="w-full max-w-lg rounded-2xl p-8 shadow-xl border"
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
              Contact Us
            </h2>
            <p
              className="text-sm mt-2"
              style={{ color: "var(--color-text-secondary)" }}
            >
              We'd love to hear from you
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label
                className="block text-sm mb-1"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Full Name <span className="text-red-500">*</span>
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
                  required
                  name="fullname"
                  value={messageData.fullname}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="bg-transparent w-full outline-none"
                  style={{ color: "var(--color-text-primary)" }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-sm mb-1"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Email Address <span className="text-red-500">*</span>
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
                  required
                  name="email"
                  value={messageData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="bg-transparent w-full outline-none"
                  style={{ color: "var(--color-text-primary)" }}
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label
                className="block text-sm mb-1"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                name="subject"
                value={messageData.subject}
                onChange={handleChange}
                placeholder="What is this regarding?"
                className="w-full rounded-xl px-4 py-3 border outline-none focus:ring-2"
                style={{
                  backgroundColor: "var(--color-background)",
                  borderColor: "var(--color-accent-soft)",
                  color: "var(--color-text-primary)",
                  "--tw-ring-color": "var(--color-secondary)",
                }}
              />
            </div>

            {/* Message */}
            <div>
              <label
                className="block text-sm mb-1"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Message <span className="text-red-500">*</span>
              </label>
              <div
                className="flex gap-3 rounded-xl px-4 py-3 border focus-within:ring-2"
                style={{
                  backgroundColor: "var(--color-background)",
                  borderColor: "var(--color-accent-soft)",
                  "--tw-ring-color": "var(--color-secondary)",
                }}
              >
                <MessageSquare
                  className="w-5 h-5 mt-1"
                  style={{ color: "var(--color-secondary)" }}
                />
                <textarea
                  rows={4}
                  required
                  name="message"
                  onChange={handleChange}
                  value={messageData.message}
                  placeholder="Write your message here..."
                  className="bg-transparent w-full outline-none resize-none"
                  style={{ color: "var(--color-text-primary)" }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 font-medium py-3 rounded-xl transition"
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
              {loading ? "Sending" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
