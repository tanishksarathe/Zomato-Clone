const InfoRow = ({ icon: Icon, label, value }) => (
  <div
    className="flex items-center gap-3 rounded-xl px-4 py-3"
    style={{ backgroundColor: "var(--color-background)" }}
  >
    <Icon size={18} style={{ color: "var(--color-primary)" }} />
    <div className="flex flex-col text-left">
      <span
        className="text-xs"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {label}
      </span>
      <span
        className="text-sm font-medium"
        style={{ color: "var(--color-text-primary)" }}
      >
        {value || "N/A"}
      </span>
    </div>
  </div>
);

export default InfoRow;