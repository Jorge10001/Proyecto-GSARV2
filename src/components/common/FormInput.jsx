import FieldError from "./FieldError.jsx";

export default function FormInput({
  label,
  value,
  error,
  onChange,
  type = "text",
  placeholder = "",
  autoComplete,
}) {
  return (
    <label>
      {label}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
      />
      <FieldError message={error} />
    </label>
  );
}
