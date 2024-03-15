const Button = ({
  children,
  type,
  textColor = "text-white",
  bgColor = "bg-gray-900",
  className = "",
  onClick,
}) => {
  return (
    <button
      type={type || "button"}
      className={`hover:bg-black rounded-md p-2 font-bold w-full ${bgColor} ${textColor} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
