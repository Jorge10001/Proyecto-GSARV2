import { useId } from "react";
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
  const inputId = useId();
  const errorId = `${inputId}-error`;

  return (
    <label htmlFor={inputId}>
      {label}
      <input
        id={inputId}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      <FieldError id={errorId} message={error} />
    </label>
  );
}
