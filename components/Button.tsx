// components/Button.tsx
type ButtonVariant = "default" | "ghost" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-full font-medium transition-all duration-300";
  const variants: Record<ButtonVariant, string> = {
    default: "bg-white text-black hover:bg-blue-700",
    ghost: "bg-transparent text-gray-300 hover:text-white",
    outline:
      "bg-transparent border border-gray-700 text-white hover:bg-gray-800",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
