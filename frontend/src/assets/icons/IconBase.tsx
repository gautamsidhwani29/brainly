export interface IconProps {
  size: "sm" | "md" | "lg";
  color?: string;
  classes?: string;
}

export const getIconProps = (props: IconProps) => {
  const { size, color, classes } = props;
  const sizes = {
    sm: "h-4 w-4 cursor-pointer",
    md: "h-6 w-6 cursor-pointer",
    lg: "h-8 w-8 cursor-pointer",
  }[size];
  return { sizes, color, classes };
};
