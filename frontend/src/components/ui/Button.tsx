import { type ReactNode } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  loading: boolean;
  onClick: () => void | Promise<void>;
  icon?: ReactNode | string;
  title: string;
  classes?: string;
}

const Button = (buttonProps: ButtonProps) => {
  let { loading, size, variant, onClick, icon, title, classes } = buttonProps;

  const variantClass = {
    primary: "bg-[#5046e4] hover:bg-[#453CC9] text-white",
    secondary: "bg-[#e0e7ff]  hover:bg-[#c7d2fe]  text-[#4740b1]",
  }[variant];

  const sizeClass = {
    sm: "px-4 py-3 text-l h-10",
    md: "px-4 py-2 text-xl h-12",
    lg: "px-6 py-6 text-xl h-12",
  }[size];
  return (
    <button
      className={`${variantClass} ${sizeClass} hover:scale-102 font-medium flex gap-2 items-center justify-center rounded rounded-md relative ${classes} `}
      onClick={onClick}
    >
      {!loading && icon && (
        <span className={loading ? "opacity-0" : ""}>{icon}</span>
      )}
      {loading ? <LoadingSpinner /> : title}
    </button>
  );
};

export default Button;
