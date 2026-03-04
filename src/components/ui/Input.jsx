import "./Input.css";

export default function Input({ type = "text", label = "", ...rest }) {
  return (
    <label>
      {label}
      {type === "textarea" ? <textarea {...rest} /> : <input type={type} {...rest} />}
    </label>
  );
}
