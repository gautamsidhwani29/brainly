import { getIconProps, type IconProps } from "./IconBase";

const RevertIcon = (props: IconProps) => {
  const { sizes, color } = getIconProps(props);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={color ?? "currentColor"}
      className={sizes ?? "size-6"}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m15 15-6 6m0 0-6-6m6 6V9a6 6 0 0 1 12 0v3"
      />
    </svg>
  );
};

export default RevertIcon;
