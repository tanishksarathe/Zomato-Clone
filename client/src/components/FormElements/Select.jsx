const Select = ({ label, value, options }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-(--color-text-secondary)">
      {label}
    </label>
    <select
      value={value}
      className="rounded-xl px-4 py-3 text-sm outline-none"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-text-primary)",
      }}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default Select;