import "./Button.css";

export default function Button({
  children,
  onClick,
  className,
  type = "button",
}) {
  return (
    <button onClick={onClick} className={`${className}`} type={type}>
      {children}
    </button>
  );
}
