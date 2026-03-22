import './Form.css';

export default function Form({ onSubmit, children }) {
  return (
    <form className="cpt-form" onSubmit={onSubmit}>
      {children}
    </form>
  );
}