interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  clase?: string;
}
function Button(props: ButtonProps) {
  const { children, onClick, clase } = props;
  return (
    <button className={clase} onClick={onClick}>
      {children}
    </button>
  );
}
export default Button;
