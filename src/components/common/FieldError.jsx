export default function FieldError({ message, id }) {
  return message ? (
    <small id={id} className="field-error" role="alert">
      {message}
    </small>
  ) : null;
}
