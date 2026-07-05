function FormInput({ label, value, error, onChange }) {
  return (
    <label>
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} />
      <FieldError message={error} />
    </label>
  );
}
