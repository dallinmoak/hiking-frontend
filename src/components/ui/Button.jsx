import "./Button.css";

export default function Button({
  children,
  onClick,
  className,
  type = "button",
}) {
  return (
    <button onClick={onClick} className={`cpt-btn ${className}`} type={type}>
      {children}
    </button>
  );
}
