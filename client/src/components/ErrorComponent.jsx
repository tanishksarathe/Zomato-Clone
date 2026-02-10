import React from "react";

const errorContent = {
  404: {
    title: "Page Not Found",
    message: "The page you're looking for doesn't exist or has been moved.",
    emoji: "🔍",
  },
  500: {
    title: "Server Error",
    message: "Something went wrong on our end. Please try again later.",
    emoji: "💥",
  },
  network: {
    title: "Network Error",
    message: "Please check your internet connection and try again.",
    emoji: "📡",
  },
  auth: {
    title: "Unauthorized",
    message: "You don't have permission to access this page.",
    emoji: "🔒",
  },
  empty: {
    title: "Nothing Here",
    message: "Looks like there's no data to display.",
    emoji: "📭",
  },
  default: {
    title: "Something went wrong",
    message: "An unexpected error occurred.",
    emoji: "⚠️",
  },
};

const ErrorComponent = ({
  type = "default",
  onRetry,
  showHome = true,
}) => {
  const error = errorContent[type] || errorContent.default;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div
        className="max-w-md w-full text-center rounded-2xl shadow-lg p-8"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        {/* Emoji / Icon */}
        <div className="text-6xl mb-4">{error.emoji}</div>

        {/* Title */}
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: "var(--color-text-primary)" }}
        >
          {error.title}
        </h1>

        {/* Message */}
        <p
          className="text-sm mb-6"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {error.message}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-5 py-2 rounded-lg font-semibold transition"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "white",
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
              Retry
            </button>
          )}

          {showHome && (
            <a
              href="/"
              className="px-5 py-2 rounded-lg font-semibold border transition"
              style={{
                borderColor: "var(--color-secondary)",
                color: "var(--color-secondary)",
              }}
            >
              Go Home
            </a>
          )}

          <a
            href="mailto:support@example.com"
            className="px-5 py-2 rounded-lg font-semibold transition"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "white",
            }}
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
