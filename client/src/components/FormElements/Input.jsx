const Input = ({ name, onChangeMethod, label, type = "text", value, disabled }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-(--color-text-secondary)">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      disabled={disabled}
      className="rounded-xl px-4 py-3 text-sm outline-none"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-text-primary)",
      }}
      onChange={onChangeMethod}
    />
  </div>
);

export default Input;